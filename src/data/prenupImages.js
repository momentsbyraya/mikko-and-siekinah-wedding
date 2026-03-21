/**
 * Prenup photos: only files in `assets/images/prenup/` (root).
 * Each file is used once (1:1). Count must match available images.
 *
 * Current pool: 17 files. Home RSVP card has no photo; layout: 6 strip + 5 gallery.
 */
const P = '/assets/images/prenup'

export const prenup = {
  navPolaroid: `${P}/prenup15.webp`,
  /** Home — first bottom polaroid (polaroid-1) */
  navMoments1: `${P}/prenup3.webp`,
  navMoments2: `${P}/5.webp`,
  detailsBanner: `${P}/prenup5.webp`,
  detailsStrip: [
    `${P}/prenup4.webp`,
    `${P}/4.webp`,
    `${P}/IMG_5067.webp`,
    `${P}/prenup13.webp`,
    `${P}/prenup8.webp`,
    `${P}/prenup2.webp`,
  ],
  momentsBanner: `${P}/prenup7.webp`,
  momentsGallery: [
    `${P}/3.jpg`,
    `${P}/2.jpg`,
    `${P}/prenup14.webp`,
    `${P}/prenup6.webp`,
    `${P}/prenup1.webp`,
  ],
  momentsClosing: `${P}/1.webp`,
}

export const navPrenupPreload = [
  prenup.navPolaroid,
  prenup.navMoments1,
  prenup.navMoments2,
]

export const momentsLightboxImages = [...prenup.momentsGallery, prenup.momentsClosing]
