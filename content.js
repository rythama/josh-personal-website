/* ==========================================================================
   SITE CONTENT
   This is the only file that needs editing to update the site.

   Images  → drop files in /assets and write "assets/my-photo.jpg",
             or paste any full image URL.
   Videos  → paste a YouTube or Vimeo link and it embeds automatically.
             Any other link (or none) shows the still with a "watch" link.
   Anything marked PLACEHOLDER should be swapped for the real thing.
   ========================================================================== */

// YouTube thumbnail for a video ID.
const yt = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

window.SITE = {
  firstName: "Joshua",
  lastName: "Paroongsup",
  roles: "Filmmaker & photographer",
  affiliation: "UVA Film Department",
  location: "Charlottesville, VA",
  timezone: "America/New_York", // drives the footer clock
  intro:
    "Short films and photographs",
  email: "jparoongsup2456@gmail.com",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/parrr.j/" },
    { label: "YouTube", url: "https://www.youtube.com/@parrrparr" },
  ],

  /* ---- FILMS ------------------------------------------------------------
     Pulled from youtube.com/@parrrparr — newest first.
     still:  the YouTube thumbnail (swap for a frame grab any time)
     video:  YouTube / Vimeo link, embeds automatically
     role:   what he did on it — fill these in, blank ones are hidden
     format: camera / stock, shown when there's no role
     hero:   set to false to keep a film out of the top viewfinder         */
  films: [
    {
      title: "Shark",
      year: 2026,
      kind: "Short film",
      runtime: "6′",
      role: "Director, Editor, Colorist",
      format: "Blackmagic",
      description:
        "When Dan runs into trouble with his local loan shark, he drags his friend Sammy into a world of trouble that seems to get worse and worse as Dan continues without any regard. Shot on a Blackmagic and edited and colour graded entirely in DaVinci. Music by ELEXIN.",
      still: yt("tHsMKBT7HE4"),
      video: "https://www.youtube.com/watch?v=tHsMKBT7HE4",
    },
    {
      title: "Home Television Guide",
      year: 2026,
      kind: "",
      runtime: "10′",
      role: "",
      description: "Follow this guide to properly enjoy your new household television!",
      still: yt("l982EThYWaw"),
      video: "https://www.youtube.com/watch?v=l982EThYWaw",
    },
    {
      title: "En Passant",
      year: 2025,
      kind: "Short film",
      runtime: "8′",
      role: "",
      description:
        "Chess players Allen Hoffman and Kim Loomis start what seems to be a friendly rivalry. It is when both of them enter the local chess tournament do they begin to understand each other's true ideals of competition, admiration, rivalry, and what play is all about.",
      still: yt("43DBIIXaniU"),
      video: "https://www.youtube.com/watch?v=43DBIIXaniU",
    },
    {
      title: "Mish Mash",
      year: 2025,
      kind: "",
      runtime: "3′",
      role: "",
      description: "",
      still: yt("IMfrJS3o_1A"),
      video: "https://www.youtube.com/watch?v=IMfrJS3o_1A",
    },
    {
      title: "Stuffed Animal",
      year: 2025,
      kind: "Short film",
      runtime: "9′",
      role: "",
      format: "16mm · Aaton XTR · Vision3 50D",
      description: "A young man makes a birthday wish, turning his stuffed animal alive!",
      still: yt("FrC-Xptdneo"),
      video: "https://www.youtube.com/watch?v=FrC-Xptdneo",
    },
    {
      title: "Atmospheric Film",
      year: 2025,
      kind: "",
      runtime: "5′",
      role: "",
      format: "16mm · Bolex H16 · Vision3 200T",
      description: "Best watched in 1440p.",
      still: yt("Ftt_Dvjk84g"),
      video: "https://www.youtube.com/watch?v=Ftt_Dvjk84g",
    },
    {
      title: "blurry deer",
      year: 2025,
      kind: "",
      runtime: "1′",
      role: "",
      description: "",
      still: yt("hENEzBiRTEY"),
      video: "https://www.youtube.com/watch?v=hENEzBiRTEY",
    },
    {
      title: "Bananas!",
      year: 2024,
      kind: "Class film",
      runtime: "2′",
      role: "",
      description: "One more film assignment.",
      still: yt("GcEnul2CXGI"),
      video: "https://www.youtube.com/watch?v=GcEnul2CXGI",
    },
    {
      title: "Knock Knock",
      year: 2024,
      kind: "Class film",
      runtime: "3′",
      role: "",
      description: "Film roll for a class! :P",
      still: yt("iBlC_M7o28k"),
      video: "https://www.youtube.com/watch?v=iBlC_M7o28k",
    },
  ],

  /* ---- PHOTOGRAPHS ------------------------------------------------------
     Each series shows up as its own strip on the contact sheet.
     Photos live in assets/photos/. Frames take each photo's own shape,
     so portrait shots stay portrait.                                    */
  series: [
    {
      title: "Tri-X, Pushed", // rename any time
      stock: "Tri-X 400 @ 1600",
      description:
        "35mm Medium Format Photography, 400 Tri-X Black and White Kodak Film pushed to 1600. Hand developed film then scanned and edited digitally for maximum contrast.",
      // Captions are just descriptions of each frame for now: swap in real titles or places.
      photos: [
        { src: "assets/photos/01-bar.jpg", caption: "Bar" },
        { src: "assets/photos/02-cat.jpg", caption: "Cat in the doorway" },
        { src: "assets/photos/03-branches.jpg", caption: "Branches" },
        { src: "assets/photos/04-chimney.jpg", caption: "Chimney" },
        { src: "assets/photos/05-patio.jpg", caption: "Patio at night" },
        { src: "assets/photos/06-chimney-bird.jpg", caption: "Chimney and bird" },
        { src: "assets/photos/07-jewelers.jpg", caption: "Jewelers" },
        { src: "assets/photos/08-booth.jpg", caption: "Booth" },
      ],
    },
  ],
};
