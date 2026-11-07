
(script-fu-register "script-fu-hdr"
                    _"<Image>/Filters/Photo/High Dynamic Range Photo"
                    "Setzt aus drei unterschiedlich belichteten Photos ein neues Bild zusammen. Reihenfolge der Photos ist egal. Photos muessen Ebenen im selben Bild sein. Die Parameter werden berechnet im Verhaeltniss zur Bildbreite, daher haben gleiche Parameter die gleiche Wirkung, unabhaengig von der Bildgroesse."
                    "Mathias Weitz"
                    "Mathias Weitz"
                    "11/01/07"
                    "RGB RGBA"
                    SF-IMAGE "Image" 0
                    SF-DRAWABLE "Drawable" 0
                    SF-ADJUSTMENT _"Mask Area" '(0 -0.5 1 0.1 0.1 1 0)
                    SF-ADJUSTMENT _"Blur Short" '(20 1 50 1 1 0 0)
                    SF-ADJUSTMENT _"Blur Bright" '(30 1 50 1 1 0 0)
                    SF-TOGGLE     _"Short on Top" TRUE
                    SF-ADJUSTMENT _"Improve" '(10 0 20 1 1 0 0)
                    )


(define (max-histogram img)
  (define layers (gimp-image-get-layers img))
  (define num-layers (car layers))
  (define layer-array (cadr layers))
  (define i num-layers)

  (define high 0)
  (define low 255)

  (define vals)
  (define mean)
  (define stddev)
  (define layer)
  (while (< 0 i)
      (set! i (- i 1))
      (set! layer (aref layer-array i))

      (set! vals (gimp-histogram layer 0 0 255))
      (set! mean (trunc (car vals)))
      (set! stddev (cadr vals))

      (if (< high mean) (set! high mean))
      (if (< mean low) (set! low mean))
  )
  (cons low (list high))
)

(define (script-fu-hdr img drawable v blurDark blurBright sot imp)

  (gimp-image-undo-disable img)
  (gimp-selection-none img)
  (define draw-type (car (gimp-drawable-type-with-alpha drawable)))

  (define low 255)
  (define high 0)

  (define e (max-histogram img))
  (define minx (car e))
  (define maxx (cadr e))

  (define layers (gimp-image-get-layers img))
  (define num-layers (car layers))
  (define layer-array (cadr layers))
  (define i num-layers)

  (define layer)
  (define dark)
  (define vals)
  (define mean)
  (define stddev)
  (define bright)
  (define medium)
  (define mediumx)
  (while (< 0 i)
      (set! i (- i 1))
      (set! layer (aref layer-array i))

      (set! vals (gimp-histogram layer 0 0 255))
      (set! mean (trunc (car vals)))
      (set! stddev (cadr vals))

      (if (= minx mean)
        (begin
          (set! dark layer)
        )
        (begin
          (if (= maxx mean)
            (begin
              (set! bright layer)
            )
            (begin
              (set! medium layer)
              (set! mediumx mean)
            )
          )
        )
      )
  )


  (define mediumC (car(gimp-layer-copy medium 0)))
  (gimp-image-add-layer img mediumC 0)
  (define brightC (car(gimp-layer-copy bright 0)))
  (define darkC (car(gimp-layer-copy dark 0)))

  (if (= sot TRUE)
  (begin
    (gimp-image-add-layer img brightC 0)
    (gimp-image-add-layer img darkC 0)
  )
  (begin
    (gimp-image-add-layer img darkC 0)
    (gimp-image-add-layer img brightC 0)
  ))


  (gimp-layer-set-name mediumC "medium")
  (gimp-layer-set-name darkC "dark")
  (gimp-layer-set-name brightC "bright")

  (define layermB (car(gimp-layer-copy medium 0)))
  (gimp-image-add-layer img layermB 0)

  (gimp-desaturate layermB)
  ;(plug-in-c-astretch 0 img layermB)

  (define layermD (car(gimp-layer-copy layermB 0)))
  (gimp-image-add-layer img layermD 0)

  (gimp-layer-set-name layermB "Bright Mask")
  (gimp-layer-set-name layermB "Dark Mask")

  (define low (max 0 (+ (* minx v) (* mediumx (- 1 v)))))
  (define high (min 255 (+ (* maxx v) (* mediumx (- 1 v)))))

  (gimp-threshold layermB 0 low)
  (gimp-threshold layermD high 255)

  (gimp-layer-add-alpha layermB)
  (gimp-layer-add-alpha layermD)

  (define mB (car (gimp-layer-create-mask layermB 5)))
  (define mD (car (gimp-layer-create-mask layermD 5)))

  (gimp-layer-add-mask brightC mB)
  (gimp-layer-add-mask darkC mD)

  (gimp-image-remove-layer img layermB)
  (gimp-image-remove-layer img layermD)

  (define wD (/ (* blurDark (car (gimp-image-width img))) 50))
  (define wB (/ (* blurBright (car (gimp-image-width img))) 50))

  (plug-in-gauss-rle2 1 img mB wB wB)
  (plug-in-gauss-rle2 1 img mD wD wD)

  (define layerF)
  (if (= sot TRUE)
  (begin
   (set! layerF (car (gimp-image-merge-down img brightC 0)))
   (set! layerF (car (gimp-image-merge-down img darkC 0)))
  )
  (begin
   (set! layerF (car (gimp-image-merge-down img darkC 0)))
   (set! layerF (car (gimp-image-merge-down img brightC 0)))
  ))

  ; Kopie machen
  (define image-type (car (gimp-image-base-type img)))
  (define new-image (car (gimp-image-new (car (gimp-image-width img)) (car (gimp-image-height img)) image-type)))
  (define display-work (car (gimp-display-new new-image)))
  (gimp-layer-set-preserve-trans layerF TRUE)

  (gimp-edit-copy layerF)
  (gimp-selection-none new-image)
  (define new-draw (car (gimp-layer-new new-image (car (gimp-image-width img)) (car (gimp-image-height img)) draw-type "HDR-Photo" 100 0)))
  (gimp-image-add-layer new-image new-draw 0)
  (gimp-drawable-fill new-draw 3)
  (gimp-edit-clear new-draw)
  (gimp-selection-clear new-image)
  (define floating-sel (car (gimp-edit-paste new-draw FALSE)))
  (gimp-floating-sel-anchor floating-sel)

  ; Ergebniss auf dem alten Bild l?schen
  (gimp-image-remove-layer img layerF)

  ; neue Ebene einf?gen mit qualitativer Verbesserung
  (define layerA (car(gimp-layer-copy new-draw 0)))
  (gimp-image-add-layer new-image layerA 0)
  (define layerP (car(gimp-layer-copy new-draw 0)))
  (gimp-image-add-layer new-image layerP 0)

  (define wDD (/ wD 50))
  (gimp-layer-set-mode layerP 5)
  (gimp-desaturate layerP)
  (gimp-invert layerP)
  (plug-in-gauss-rle2 1 new-image layerP wDD wDD)
  (set! layerP (car (gimp-image-merge-down new-image layerP 0)))

  (define layerPP)
  (define wP)
  (if (< 0 imp)
  (begin
    (plug-in-autostretch-hsv 1 new-image layerP)
    (set! layerPP (car(gimp-layer-copy layerP 0)))
    (gimp-image-add-layer new-image layerPP 0)
    (gimp-layer-set-mode layerPP 5)
    (set! wP (/ (* imp (car (gimp-image-width img))) 100))
    (plug-in-gauss-rle2 1 new-image layerPP wP wP)
    (set! layerP (car (gimp-image-merge-down new-image layerPP 0)))
  ))

  ; Beschreibung
  (define descr "HDR-Photo:")

  (set! descr (string-append descr " Mask "))
  (set! descr (string-append descr (number->string v)))
  (set! descr (string-append descr ", Short "))
  (set! descr (string-append descr (number->string blurDark)))
  (set! descr (string-append descr ", Long "))
  (set! descr (string-append descr (number->string blurBright)))

  (gimp-layer-set-name new-draw descr)

  ;blurDark blurBright sot

  (gimp-image-undo-enable img)
  (gimp-image-clean-all img)
  (gimp-displays-flush)
)

(script-fu-register "script-fu-hdr2"
                    _"<Image>/Filters/Photo/High Dynamic Range Photo 2"
                    "Setzt aus drei unterschiedlich belichteten Photos ein neues Bild zusammen. Reihenfolge der Photos ist egal. Photos muessen Ebenen im selben Bild sein."
                    "Mathias Weitz"
                    "Mathias Weitz"
                    "23/01/07"
                    "RGB RGBA"
                    SF-IMAGE "Image" 0
                    SF-DRAWABLE "Drawable" 0
                    SF-OPTION     _"Reduce HDR-Effect" '(_"None"
                                            _"Weak"
                                            _"Medium"
                                            _"Stronger"
                                            _"Strongest")
                    SF-OPTION     _"Sharpen" '(_"None"
                                            _"Weak"
                                            _"Medium"
                                            _"Strong")
                    SF-TOGGLE     _"Short on Top" TRUE
                    )

(define (script-fu-hdr2 img drawable levelseffekt softeffekt sot)

  (gimp-image-undo-disable img)
  (gimp-selection-none img)
  (define draw-type (car (gimp-drawable-type-with-alpha drawable)))

  (define low 255)
  (define high 0)

  (define e (max-histogram img))
  (define minx (car e))
  (define maxx (cadr e))

  (define layers (gimp-image-get-layers img))
  (define num-layers (car layers))
  (define layer-array (cadr layers))
  (define i num-layers)

  (define layer)
  (define vals)
  (define mean)
  (define stddev)
  (define dark)
  (define bright)
  (define medium)
  (define mediumx)
  (while (< 0 i)
      (set! i (- i 1))
      (set! layer (aref layer-array i))

      (set! vals (gimp-histogram layer 0 0 255))
      (set! mean (trunc (car vals)))
      (set! stddev (cadr vals))

      (if (= minx mean)
        (begin
          (set! dark layer)
        )
        (begin
          (if (= maxx mean)
            (begin
              (set! bright layer)
            )
            (begin
              (set! medium layer)
              (set! mediumx mean)
            )
          )
        )
      )
  )

  (define mediumC (car(gimp-layer-copy medium 0)))
  (gimp-image-add-layer img mediumC 0)
  (define brightC (car(gimp-layer-copy bright 0)))
  (define darkC (car(gimp-layer-copy dark 0)))

  (if (= sot TRUE)
  (begin
    (gimp-image-add-layer img brightC 0)
    (gimp-image-add-layer img darkC 0)
  )
  (begin
    (gimp-image-add-layer img darkC 0)
    (gimp-image-add-layer img brightC 0)
  ))

  (gimp-layer-set-name mediumC "medium")
  (gimp-layer-set-name darkC "dark")
  (gimp-layer-set-name brightC "bright")

  (define layermB (car(gimp-layer-copy medium 0)))
  (gimp-image-add-layer img layermB 0)

  (gimp-desaturate layermB)
  (plug-in-c-astretch 0 img layermB)

  (if (= softeffekt 1)
  (begin
    (plug-in-sel-gauss 1 img layermB 2 50)
  ))

  (if (= softeffekt 2)
  (begin
    (plug-in-sel-gauss 1 img layermB 2 100)
  ))

  (if (= softeffekt 3)
  (begin
    (plug-in-sel-gauss 1 img layermB   5 100)
  ))

  (define layermD (car(gimp-layer-copy layermB 0)))
  (gimp-image-add-layer img layermD 0)

  (gimp-invert layermB)

  (gimp-layer-set-name layermB "Bright Mask")
  (gimp-layer-set-name layermD "Dark Mask")


  (if (= levelseffekt 1)
  (begin
    (gimp-levels layermB 0 0 255 0.8 0 255)
    (gimp-levels layermD 0 0 255 1.25 0 255)
  ))
  (if (= levelseffekt 2)
  (begin
    (gimp-levels layermB 0 0 255 0.625 0 255)
    (gimp-levels layermD 0 0 255 1.6 0 255)
  ))
  (if (= levelseffekt 3)
  (begin
    (gimp-levels layermB 0 0 255 0.5 0 255)
    (gimp-levels layermD 0 0 255 2 0 255)
  ))
  (if (= levelseffekt 4)
  (begin
    (gimp-levels layermB 0 0 255 0.4 0 255)
    (gimp-levels layermD 0 0 255 2.5 0 255)
  ))

  (gimp-layer-add-alpha layermB)
  (gimp-layer-add-alpha layermD)

  (define mB (car (gimp-layer-create-mask layermB 5)))
  (define mD (car (gimp-layer-create-mask layermD 5)))

  (gimp-layer-add-mask brightC mB)
  (gimp-layer-add-mask darkC mD)

  (gimp-image-remove-layer img layermB)
  (gimp-image-remove-layer img layermD)

  (define layerF)
  (if (= sot TRUE)
  (begin
   (set! layerF (car (gimp-image-merge-down img brightC 0)))
   (set! layerF (car (gimp-image-merge-down img darkC 0)))
  )
  (begin
   (set! layerF (car (gimp-image-merge-down img darkC 0)))
   (set! layerF (car (gimp-image-merge-down img brightC 0)))
  ))

  ; Kopie machen
  (define image-type (car (gimp-image-base-type img)))
  (define new-image (car (gimp-image-new (car (gimp-image-width img)) (car (gimp-image-height img)) image-type)))
  (define display-work (car (gimp-display-new new-image)))
  (gimp-layer-set-preserve-trans layerF TRUE)

  (gimp-edit-copy layerF)
  (gimp-selection-none new-image)
  (define new-draw (car (gimp-layer-new new-image (car (gimp-image-width img)) (car (gimp-image-height img)) draw-type "HDR-Photo" 100 0)))
  (gimp-image-add-layer new-image new-draw 0)
  (gimp-drawable-fill new-draw 3)
  (gimp-edit-clear new-draw)
  (gimp-selection-clear new-image)
  (define floating-sel (car (gimp-edit-paste new-draw FALSE)))
  (gimp-floating-sel-anchor floating-sel)

  ; Ergebniss auf dem alten Bild l?schen
  (gimp-image-remove-layer img layerF)

  (plug-in-autostretch-hsv 1 new-image new-draw)

  ; neue Ebene einf?gen mit qualitativer Verbesserung
  ;(set! layerA (car(gimp-layer-copy new-draw 0)))
  ;(gimp-image-add-layer new-image layerA 0)
  ;(set! layerP (car(gimp-layer-copy new-draw 0)))
  ;(gimp-image-add-layer new-image layerP 0)

  ;(set! wDD (/ wD 50))
  ;(gimp-layer-set-mode layerP 5)
  ;(gimp-desaturate layerP)
  ;(gimp-invert layerP)
  ;(plug-in-gauss-rle2 1 new-image layerP wDD wDD)
  ;(set! layerP (car (gimp-image-merge-down new-image layerP 0)))

  ;(if (< 0 imp)
  ;(begin
  ;  (plug-in-autostretch-hsv 1 new-image layerP)
  ;  (set! layerPP (car(gimp-layer-copy layerP 0)))
  ;  (gimp-image-add-layer new-image layerPP 0)
  ;  (gimp-layer-set-mode layerPP 5)
  ;  (set! wP (/ (* imp (car (gimp-image-width img))) 100))
  ;  (plug-in-gauss-rle2 1 new-image layerPP wP wP)
  ;  (set! layerP (car (gimp-image-merge-down new-image layerPP 0)))
  ;))

  ; Beschreibung
  (define descr "HDR-Photo:")

  ;(set! descr (string-append descr " Mask "))
  ;(set! descr (string-append descr (number->string v)))
  ;(set! descr (string-append descr ", Short "))
  ;(set! descr (string-append descr (number->string blurDark)))
  ;(set! descr (string-append descr ", Long "))
  ;(set! descr (string-append descr (number->string blurBright)))

  (gimp-layer-set-name new-draw descr)


  (gimp-image-undo-enable img)
  (gimp-image-clean-all img)
  (gimp-displays-flush)
)