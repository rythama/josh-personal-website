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

// PLACEHOLDER image helper — delete once real images are in.
const ph = (seed, w, h, bw = false) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}${bw ? "?grayscale" : ""}`;

window.SITE = {
  firstName: "Joshua",
  lastName: "Paroongsup",
  roles: "Filmmaker & photographer",
  affiliation: "UVA Film Department",
  location: "Charlottesville, VA",
  timezone: "America/New_York", // drives the footer clock
  intro:
    "Short films and photographs, mostly about people and the light they happen to be standing in.",
  email: "jparoongsup2456@gmail.com",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/parrr.j/" },
    { label: "YouTube", url: "https://www.youtube.com/@parrrparr" },
    { label: "Letterboxd", url: "https://letterboxd.com/" }, // PLACEHOLDER
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
     Each series shows up as its own strip on the contact sheet.      */
  series: [
    {
      title: "Salt", // PLACEHOLDER
      year: 2025,
      stock: "Colour 400",
      note: "Coastal towns out of season.",
      photos: [
        { src: ph("salt1", 1500, 1000), caption: "Pier, early", place: "Morro Bay" },
        { src: ph("salt2", 1500, 1000), caption: "Lifeguard tower", place: "Morro Bay" },
        { src: ph("salt3", 1500, 1000), caption: "Closed for winter", place: "Cayucos" },
        { src: ph("salt4", 1500, 1000), caption: "Two swimmers", place: "Cayucos" },
        { src: ph("salt5", 1500, 1000), caption: "Fog bank", place: "Pismo" },
        { src: ph("salt6", 1500, 1000), caption: "Motel sign", place: "Pismo" },
        { src: ph("salt7", 1500, 1000), caption: "Last light", place: "Avila" },
      ],
    },
    {
      title: "After Hours", // PLACEHOLDER
      year: 2024,
      stock: "B&W 3200",
      note: "City nights, pushed two stops.",
      photos: [
        { src: ph("night1", 1500, 1000, true), caption: "Laundromat", place: "Echo Park" },
        { src: ph("night2", 1500, 1000, true), caption: "Bus stop, 2am", place: "Koreatown" },
        { src: ph("night3", 1500, 1000, true), caption: "Rooftop", place: "Downtown" },
        { src: ph("night4", 1500, 1000, true), caption: "Taxi rank", place: "Downtown" },
        { src: ph("night5", 1500, 1000, true), caption: "Neon, rain", place: "Silver Lake" },
        { src: ph("night6", 1500, 1000, true), caption: "Waiting", place: "Union Station" },
      ],
    },
    {
      title: "Field Notes", // PLACEHOLDER
      year: 2023,
      stock: "Colour 200",
      note: "Odds and ends from the road.",
      photos: [
        { src: ph("field1", 1500, 1000), caption: "Desert motel", place: "Joshua Tree" },
        { src: ph("field2", 1500, 1000), caption: "Gas station", place: "Route 66" },
        { src: ph("field3", 1500, 1000), caption: "Cattle crossing", place: "Nevada" },
        { src: ph("field4", 1500, 1000), caption: "Overlook", place: "Utah" },
        { src: ph("field5", 1500, 1000), caption: "Back seat", place: "Somewhere in Arizona" },
        { src: ph("field6", 1500, 1000), caption: "Home", place: "Charlottesville" },
      ],
    },
  ],
};
