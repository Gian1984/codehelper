/**
 * API Registry
 * Curated collection of public APIs for developers
 * Data migrated from LetuDev project
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ExternalAPI {
    api: string
    desc: string
    href: string
    auth: 'No' | 'apiKey' | 'OAuth' | 'X-Mashape-Key'
    https: 'Yes' | 'No'
    cors: 'Yes' | 'No' | 'Unknown'
    category: APICategory
}

export type APICategory =
    | 'development'
    | 'animals'
    | 'anime'
    | 'anti-malware'
    | 'art-design'
    | 'auth'
    | 'blockchain'
    | 'books'
    | 'business'
    | 'calendar'
    | 'cloud'
    | 'continuous-integration'
    | 'cryptocurrency'
    | 'currency-exchange'
    | 'data-validation'
    | 'dictionaries'
    | 'productivity'
    | 'email'
    | 'entertainment'
    | 'environment'
    | 'events'
    | 'finance'
    | 'food-drink'
    | 'games-comics'
    | 'geocoding'
    | 'government'
    | 'health'
    | 'jobs'
    | 'music'
    | 'news'
    | 'open-data'
    | 'open-source'
    | 'patents'
    | 'personality'
    | 'phone'
    | 'photography'
    | 'programming'
    | 'science-math'
    | 'security'

export interface APICategoryMeta {
    title: string
    description: string
    icon?: string
    count?: number
}

// ============================================================================
// CATEGORY METADATA
// ============================================================================

export const apiCategoryMeta: Record<APICategory, APICategoryMeta> = {
    'development': {
        title: 'Development APIs',
        description: 'APIs for development tools and services',
    },
    'animals': {
        title: 'Animals APIs',
        description: 'APIs about animals and pets',
    },
    'anime': {
        title: 'Anime APIs',
        description: 'Anime and manga information APIs',
    },
    'anti-malware': {
        title: 'Anti-Malware APIs',
        description: 'Security and malware detection APIs',
    },
    'art-design': {
        title: 'Art & Design APIs',
        description: 'Art and design resource APIs',
    },
    'auth': {
        title: 'Authentication APIs',
        description: 'Authentication and authorization services',
    },
    'blockchain': {
        title: 'Blockchain APIs',
        description: 'Blockchain and cryptocurrency APIs',
    },
    'books': {
        title: 'Books APIs',
        description: 'Book information and library APIs',
    },
    'business': {
        title: 'Business APIs',
        description: 'Business data and services',
    },
    'calendar': {
        title: 'Calendar APIs',
        description: 'Calendar and scheduling services',
    },
    'cloud': {
        title: 'Cloud Storage APIs',
        description: 'Cloud storage and file sharing',
    },
    'continuous-integration': {
        title: 'CI/CD APIs',
        description: 'Continuous integration and deployment',
    },
    'cryptocurrency': {
        title: 'Cryptocurrency APIs',
        description: 'Cryptocurrency data and trading',
    },
    'currency-exchange': {
        title: 'Currency Exchange APIs',
        description: 'Currency rates and conversion',
    },
    'data-validation': {
        title: 'Data Validation APIs',
        description: 'Data validation and verification',
    },
    'dictionaries': {
        title: 'Dictionaries APIs',
        description: 'Language dictionaries and translations',
    },
    'productivity': {
        title: 'Productivity APIs',
        description: 'Productivity and workflow tools',
    },
    'email': {
        title: 'Email APIs',
        description: 'Email services and validation',
    },
    'entertainment': {
        title: 'Entertainment APIs',
        description: 'Movies, TV, and entertainment data',
    },
    'environment': {
        title: 'Environment APIs',
        description: 'Environmental data and weather',
    },
    'events': {
        title: 'Events APIs',
        description: 'Event listings and tickets',
    },
    'finance': {
        title: 'Finance APIs',
        description: 'Financial data and services',
    },
    'food-drink': {
        title: 'Food & Drink APIs',
        description: 'Recipes and nutrition information',
    },
    'games-comics': {
        title: 'Games & Comics APIs',
        description: 'Gaming and comic book data',
    },
    'geocoding': {
        title: 'Geocoding APIs',
        description: 'Location and mapping services',
    },
    'government': {
        title: 'Government APIs',
        description: 'Government data and services',
    },
    'health': {
        title: 'Health APIs',
        description: 'Health and fitness data',
    },
    'jobs': {
        title: 'Jobs APIs',
        description: 'Job listings and career data',
    },
    'music': {
        title: 'Music APIs',
        description: 'Music streaming and metadata',
    },
    'news': {
        title: 'News APIs',
        description: 'News articles and media',
    },
    'open-data': {
        title: 'Open Data APIs',
        description: 'Open datasets and statistics',
    },
    'open-source': {
        title: 'Open Source APIs',
        description: 'Open source project data',
    },
    'patents': {
        title: 'Patent APIs',
        description: 'Patent information and search',
    },
    'personality': {
        title: 'Personality APIs',
        description: 'Personality tests and quizzes',
    },
    'phone': {
        title: 'Phone APIs',
        description: 'Phone number validation and lookup',
    },
    'photography': {
        title: 'Photography APIs',
        description: 'Photo sharing and stock images',
    },
    'programming': {
        title: 'Programming APIs',
        description: 'Programming languages and tools',
    },
    'science-math': {
        title: 'Science & Math APIs',
        description: 'Scientific and mathematical data',
    },
    'security': {
        title: 'Security APIs',
        description: 'Security and vulnerability data',
    },
}

// ============================================================================
// EXTERNAL APIs DATA
// ============================================================================

export const externalAPIs: Record<APICategory, ExternalAPI[]> = {
    'development': [
        {
            "api": "24 Pull Requests",
            "desc": "Project to promote open source collaboration during December",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://24pullrequests.com/api",
            "category": "development"
        },
        {
            "api": "Abstract Screenshot",
            "desc": "Take programmatic screenshots of web pages from any website",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.abstractapi.com/website-screenshot-api",
            "category": "development"
        },
        {
            "api": "Agify.io",
            "desc": "Estimates the age from a first name",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://agify.io",
            "category": "development"
        },
        {
            "api": "API Grátis",
            "desc": "Multiples services and public APIs",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://apigratis.com.br/",
            "category": "development"
        },
        {
            "api": "ApicAgent",
            "desc": "Extract device details from user-agent string",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.apicagent.com",
            "category": "development"
        },
        {
            "api": "ApiFlash",
            "desc": "Chrome based screenshot API for developers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://apiflash.com/",
            "category": "development"
        },
        {
            "api": "apilayer userstack",
            "desc": "Secure User-Agent String Lookup JSON API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://userstack.com/",
            "category": "development"
        },
        {
            "api": "APIs.guru",
            "desc": "Wikipedia for Web APIs, OpenAPI/Swagger specs for public APIs",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://apis.guru/api-doc/",
            "category": "development"
        },
        {
            "api": "Azure DevOps",
            "desc": "The Azure DevOps basic components of a REST API request/response pair",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.microsoft.com/en-us/rest/api/azure/devops",
            "category": "development"
        },
        {
            "api": "Base",
            "desc": "Building quick backends",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.base-api.io/",
            "category": "development"
        }
    ],

    'animals': [
        {
            "api": "AdoptAPet",
            "desc": "Resource to help get pets adopted",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.adoptapet.com/public/apis/pet_list.html",
            "category": "animals"
        },
        {
            "api": "Axolotl",
            "desc": "Collection of axolotl pictures and facts",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://theaxolotlapi.netlify.app/",
            "category": "animals"
        },
        {
            "api": "Cat Facts",
            "desc": "Daily cat facts",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://alexwohlbruck.github.io/cat-facts/",
            "category": "animals"
        },
        {
            "api": "Cataas",
            "desc": "Cat as a service (cat pictures and GIFs)",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://cataas.com/",
            "category": "animals"
        },
        {
            "api": "Cats",
            "desc": "Pictures of cats from Tumblr",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://docs.thecatapi.com/",
            "category": "animals"
        },
        {
            "api": "Dog Facts",
            "desc": "Random dog facts",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://dukengn.github.io/Dog-facts-API/",
            "category": "animals"
        },
        {
            "api": "Dog Facts (Kinduff)",
            "desc": "Random facts about dogs",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://kinduff.github.io/dog-api/",
            "category": "animals"
        },
        {
            "api": "Dogs",
            "desc": "Based on the Stanford Dogs Dataset",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://dog.ceo/dog-api/",
            "category": "animals"
        },
        {
            "api": "eBird",
            "desc": "Retrieve recent or notable birding observations within a region",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://documenter.getpostman.com/view/664302/S1ENwy59",
            "category": "animals"
        },
        {
            "api": "FishWatch",
            "desc": "Information and pictures about individual fish species",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.fishwatch.gov/developers",
            "category": "animals"
        },
        {
            "api": "HTTP Cat",
            "desc": "Cat images for every HTTP status code",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://http.cat/",
            "category": "animals"
        },
        {
            "api": "HTTP Dog",
            "desc": "Dog images for every HTTP status code",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://http.dog/",
            "category": "animals"
        },
        {
            "api": "IUCN",
            "desc": "IUCN Red List of Threatened Species",
            "auth": "apiKey",
            "https": "No",
            "cors": "No",
            "href": "http://apiv3.iucnredlist.org/api/v3/docs",
            "category": "animals"
        },
        {
            "api": "MeowFacts",
            "desc": "Get random cat facts",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://github.com/wh-iterabb-it/meowfacts",
            "category": "animals"
        },
        {
            "api": "Movebank",
            "desc": "Movement and migration data of animals",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/movebank/movebank-api-doc",
            "category": "animals"
        },
        {
            "api": "Petfinder",
            "desc": "Resource dedicated to helping pets find homes",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.petfinder.com/developers/",
            "category": "animals"
        },
        {
            "api": "PlaceBear",
            "desc": "Placeholder bear pictures",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://placebear.com/",
            "category": "animals"
        },
        {
            "api": "PlaceDog",
            "desc": "Placeholder dog pictures",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://place.dog",
            "category": "animals"
        },
        {
            "api": "PlaceKitten",
            "desc": "Placeholder kitten pictures",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://placekitten.com/",
            "category": "animals"
        },
        {
            "api": "RandomDog",
            "desc": "Random pictures of dogs",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://random.dog/woof.json",
            "category": "animals"
        },
        {
            "api": "RandomDuck",
            "desc": "Random pictures of ducks",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://random-d.uk/api",
            "category": "animals"
        },
        {
            "api": "RandomFox",
            "desc": "Random pictures of foxes",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://randomfox.ca/floof/",
            "category": "animals"
        },
        {
            "api": "RescueGroups",
            "desc": "Pet adoption and rescue information",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://userguide.rescuegroups.org/display/APIDG/API+Developers+Guide+Home",
            "category": "animals"
        },
        {
            "api": "Shibe Online",
            "desc": "Random pictures of Shiba Inu, cats, or birds",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "http://shibe.online/",
            "category": "animals"
        },
        {
            "api": "The Dog",
            "desc": "Public service API about dogs — perfect for apps or websites",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://thedogapi.com/",
            "category": "animals"
        },
        {
            "api": "Xeno-canto",
            "desc": "Bird recordings and species information",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://xeno-canto.org/explore/api",
            "category": "animals"
        },
        {
            "api": "Zoo Animals",
            "desc": "Facts and pictures of zoo animals",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://zoo-animal-api.herokuapp.com/",
            "category": "animals"
        }
    ],

    'music': [
        {
            "api": "7digital",
            "desc": "API of the music store 7digital",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.7digital.com/reference",
            "category": "music"
        },
        {
            "api": "AI Mastering",
            "desc": "Automated music mastering",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://aimastering.com/api_docs/",
            "category": "music"
        },
        {
            "api": "Audiomack",
            "desc": "API of the streaming music hub Audiomack",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.audiomack.com/data-api/docs",
            "category": "music"
        },
        {
            "api": "Bandcamp",
            "desc": "API of the Bandcamp music store",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bandcamp.com/developer",
            "category": "music"
        },
        {
            "api": "Bandsintown",
            "desc": "API for discovering live music events and tours",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0",
            "category": "music"
        },
        {
            "api": "Deezer",
            "desc": "Access Deezer's music catalog and user data",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.deezer.com/api",
            "category": "music"
        },
        {
            "api": "Discogs",
            "desc": "Database and marketplace for music releases and artists",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.discogs.com/developers/",
            "category": "music"
        },
        {
            "api": "Freesound",
            "desc": "Database of free music samples and sound effects",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://freesound.org/docs/api/",
            "category": "music"
        },
        {
            "api": "Gaana",
            "desc": "Retrieve song and album information from Gaana",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/cyberboysumanjay/GaanaAPI",
            "category": "music"
        },
        {
            "api": "Genius",
            "desc": "Crowdsourced lyrics and music knowledge platform",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.genius.com/",
            "category": "music"
        },
        {
            "api": "Genrenator",
            "desc": "Generates random music genres for inspiration",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://binaryjazz.us/genrenator-api/",
            "category": "music"
        },
        {
            "api": "iTunes Search",
            "desc": "Search the iTunes Store for music, apps, and media",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/",
            "category": "music"
        },
        {
            "api": "Jamendo",
            "desc": "Music API for accessing Jamendo’s song catalog and artists",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.jamendo.com/v3.0/docs",
            "category": "music"
        },
        {
            "api": "JioSaavn",
            "desc": "Retrieve song, album, and artist data from JioSaavn",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/cyberboysumanjay/JioSaavnAPI",
            "category": "music"
        },
        {
            "api": "KKBOX",
            "desc": "Access KKBOX music libraries, playlists, and charts",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.kkbox.com",
            "category": "music"
        },
        {
            "api": "KSoft.Si Lyrics",
            "desc": "API to get lyrics for songs",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.ksoft.si/api/lyrics-api",
            "category": "music"
        },
        {
            "api": "LastFm",
            "desc": "Music discovery, listening stats, and user data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.last.fm/api",
            "category": "music"
        },
        {
            "api": "Lyrics.ovh",
            "desc": "Simple API to retrieve lyrics of a song",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://lyricsovh.docs.apiary.io",
            "category": "music"
        },
        {
            "api": "Mixcloud",
            "desc": "Access Mixcloud's streaming and upload data",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.mixcloud.com/developers/",
            "category": "music"
        },
        {
            "api": "MusicBrainz",
            "desc": "Open music encyclopedia collecting music metadata",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2",
            "category": "music"
        },
        {
            "api": "Musixmatch",
            "desc": "Music and lyrics database API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.musixmatch.com/",
            "category": "music"
        },
        {
            "api": "Napster",
            "desc": "API for accessing Napster’s music catalog and metadata",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developer.napster.com/api/v2.2",
            "category": "music"
        },
        {
            "api": "Openwhyd",
            "desc": "Download and manage playlists from streaming platforms",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://openwhyd.github.io/openwhyd/API",
            "category": "music"
        },
        {
            "api": "Phishin",
            "desc": "Web archive of legal live recordings of the band Phish",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://phish.in/api-docs",
            "category": "music"
        },
        {
            "api": "Radio Browser",
            "desc": "List of internet radio stations with metadata",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.radio-browser.info/",
            "category": "music"
        },
        {
            "api": "Songkick",
            "desc": "API for concert and live music events",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.songkick.com/developer/",
            "category": "music"
        },
        {
            "api": "Songlink / Odesli",
            "desc": "Retrieve all streaming platforms where a song is available",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.notion.so/API-d0ebe08a5e304a55928405eb682f6741",
            "category": "music"
        },
        {
            "api": "Songsterr",
            "desc": "Provides guitar, bass, and drums tabs and chords",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.songsterr.com/a/wa/api/",
            "category": "music"
        },
        {
            "api": "SoundCloud",
            "desc": "Build applications to interact with SoundCloud music and users",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.soundcloud.com/docs/api/guide",
            "category": "music"
        },
        {
            "api": "Spotify",
            "desc": "Access Spotify's music catalog, user libraries, and recommendations",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://beta.developer.spotify.com/documentation/web-api/",
            "category": "music"
        },
        {
            "api": "TasteDive",
            "desc": "Find similar artists, movies, or TV shows",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tastedive.com/read/api",
            "category": "music"
        },
        {
            "api": "TheAudioDB",
            "desc": "Music database API providing metadata and artwork",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.theaudiodb.com/api_guide.php",
            "category": "music"
        },
        {
            "api": "Vagalume",
            "desc": "Crowdsourced lyrics and music metadata API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.vagalume.com.br/docs/",
            "category": "music"
        }
    ],

    'news': [
        {
            "api": "apilayer mediastack",
            "desc": "Free, simple REST API for live news & blog articles",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://mediastack.com/",
            "category": "news"
        },
        {
            "api": "Associated Press",
            "desc": "Search for news and metadata from the Associated Press",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.ap.org/",
            "category": "news"
        },
        {
            "api": "Chronicling America",
            "desc": "Access millions of pages of historic US newspapers from the Library of Congress",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://chroniclingamerica.loc.gov/about/api/",
            "category": "news"
        },
        {
            "api": "Currents",
            "desc": "Latest news published across various news sources, blogs, and forums",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://currentsapi.services/",
            "category": "news"
        },
        {
            "api": "Feedbin",
            "desc": "RSS reader API for managing subscriptions and feeds",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/feedbin/feedbin-api",
            "category": "news"
        },
        {
            "api": "GNews",
            "desc": "Search for news articles from multiple sources",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://gnews.io/",
            "category": "news"
        },
        {
            "api": "Graphs for Coronavirus",
            "desc": "Worldwide and country-specific graphs for COVID-19 with daily updates",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://corona.dnsforfamily.com/api.txt",
            "category": "news"
        },
        {
            "api": "Inshorts News",
            "desc": "Get summarized news articles from Inshorts",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/cyberboysumanjay/Inshorts-News-API",
            "category": "news"
        },
        {
            "api": "MarketAux",
            "desc": "Live stock market news with tickers, sentiment, and stats",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.marketaux.com/",
            "category": "news"
        },
        {
            "api": "New York Times",
            "desc": "Access articles and data from The New York Times",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.nytimes.com/",
            "category": "news"
        },
        {
            "api": "News",
            "desc": "Headlines and articles from a wide range of sources and blogs",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://newsapi.org/",
            "category": "news"
        },
        {
            "api": "NewsData",
            "desc": "Live breaking news and headlines from trusted global sources",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://newsdata.io/docs",
            "category": "news"
        },
        {
            "api": "NewsX",
            "desc": "Search latest breaking news with AI-powered summaries",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://rapidapi.com/machaao-inc-machaao-inc-default/api/newsx/",
            "category": "news"
        },
        {
            "api": "NPR One",
            "desc": "Personalized news and radio listening experience from NPR",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://dev.npr.org/api/",
            "category": "news"
        },
        {
            "api": "Spaceflight News",
            "desc": "Spaceflight-related news and articles",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://spaceflightnewsapi.net",
            "category": "news"
        },
        {
            "api": "The Guardian",
            "desc": "Access all Guardian content, categorized by tags and sections",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://open-platform.theguardian.com/",
            "category": "news"
        },
        {
            "api": "The Old Reader",
            "desc": "RSS reader API for managing subscriptions",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/theoldreader/api",
            "category": "news"
        },
        {
            "api": "TheNews",
            "desc": "Aggregated headlines, top stories, and live news feed API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.thenewsapi.com/",
            "category": "news"
        },
        {
            "api": "Trove",
            "desc": "Search through Australia's National Library digital newspaper collection",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://trove.nla.gov.au/about/create-something/using-api",
            "category": "news"
        }
    ],

    // Placeholder categories (to be populated)
    'anime': [
        {
            "api": "AniAPI",
            "desc": "Anime discovery, streaming, and syncing with trackers",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://aniapi.com/docs/",
            "category": "anime"
        },
        {
            "api": "AniDB",
            "desc": "Comprehensive anime database",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "https://wiki.anidb.net/HTTP_API_Definition",
            "category": "anime"
        },
        {
            "api": "AniList",
            "desc": "Anime discovery and tracking platform",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/AniList/ApiV2-GraphQL-Docs",
            "category": "anime"
        },
        {
            "api": "AnimeChan",
            "desc": "Random anime quotes (10k+ available)",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://github.com/RocktimSaikia/anime-chan",
            "category": "anime"
        },
        {
            "api": "AnimeFacts",
            "desc": "Fun anime facts (100+ entries)",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://chandan-02.github.io/anime-facts-rest-api/",
            "category": "anime"
        },
        {
            "api": "AnimeNewsNetwork",
            "desc": "Anime industry news and encyclopedia access",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.animenewsnetwork.com/encyclopedia/api.php",
            "category": "anime"
        },
        {
            "api": "Catboy",
            "desc": "Neko images, anime GIFs, and quotes",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://catboys.com/api",
            "category": "anime"
        },
        {
            "api": "Danbooru Anime",
            "desc": "Massive database of anime art and illustrations",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://danbooru.donmai.us/wiki_pages/help:api",
            "category": "anime"
        },
        {
            "api": "Jikan",
            "desc": "Unofficial MyAnimeList API (JSON REST + GraphQL)",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://jikan.moe",
            "category": "anime"
        },
        {
            "api": "Kitsu",
            "desc": "Anime discovery and social tracking platform",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://kitsu.docs.apiary.io/",
            "category": "anime"
        },
        {
            "api": "MangaDex",
            "desc": "Manga database and community platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.mangadex.org/docs.html",
            "category": "anime"
        },
        {
            "api": "Mangapi",
            "desc": "Translate manga pages between languages",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://rapidapi.com/pierre.carcellermeunier/api/mangapi3/",
            "category": "anime"
        },
        {
            "api": "MyAnimeList",
            "desc": "Official MyAnimeList API for anime and manga data",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://myanimelist.net/clubs.php?cid=13727",
            "category": "anime"
        },
        {
            "api": "NekosBest",
            "desc": "Neko images and anime roleplaying GIFs",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.nekos.best",
            "category": "anime"
        },
        {
            "api": "Shikimori",
            "desc": "Anime discovery, tracking, ratings, and forum API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://shikimori.one/api/doc",
            "category": "anime"
        },
        {
            "api": "Studio Ghibli",
            "desc": "Access data and resources from Studio Ghibli films",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://ghibliapi.herokuapp.com",
            "category": "anime"
        },
        {
            "api": "Trace Moe",
            "desc": "Find the exact anime scene from a screenshot",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://soruly.github.io/trace.moe-api/#/",
            "category": "anime"
        },
        {
            "api": "Waifu.im",
            "desc": "Get waifu images from a 4000+ archive with tags",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://waifu.im/docs",
            "category": "anime"
        },
        {
            "api": "Waifu.pics",
            "desc": "Image sharing platform for anime and waifu pictures",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://waifu.pics/docs",
            "category": "anime"
        }
    ],

    'anti-malware': [
        {
            "api": "AbuseIPDB",
            "desc": "IP, domain, and URL reputation database",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.abuseipdb.com/",
            "category": "anti-malware"
        },
        {
            "api": "AlienVault Open Threat Exchange (OTX)",
            "desc": "IP, domain, and URL reputation and threat intelligence",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://otx.alienvault.com/api",
            "category": "anti-malware"
        },
        {
            "api": "CAPEsandbox",
            "desc": "Malware execution, behavior analysis, and sample reporting",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://capev2.readthedocs.io/en/latest/usage/api.html",
            "category": "anti-malware"
        },
        {
            "api": "Google Safe Browsing",
            "desc": "Detect unsafe web resources such as phishing and malware sites",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/safe-browsing/",
            "category": "anti-malware"
        },
        {
            "api": "MalDatabase",
            "desc": "Access malware datasets and threat intelligence feeds",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://maldatabase.com/api-doc.html",
            "category": "anti-malware"
        },
        {
            "api": "MalShare",
            "desc": "Malware archive and file sourcing platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://malshare.com/doc.php",
            "category": "anti-malware"
        },
        {
            "api": "MalwareBazaar",
            "desc": "Collect, share, and analyze malware samples",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bazaar.abuse.ch/api/",
            "category": "anti-malware"
        },
        {
            "api": "Metacert",
            "desc": "URL and link security reputation verification",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://metacert.com/",
            "category": "anti-malware"
        },
        {
            "api": "NoPhishy",
            "desc": "Check if a link is a known phishing attempt",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://rapidapi.com/Amiichu/api/exerra-phishing-check/",
            "category": "anti-malware"
        },
        {
            "api": "Phisherman",
            "desc": "API for phishing domain and IP reputation data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://phisherman.gg/",
            "category": "anti-malware"
        },
        {
            "api": "Scanii",
            "desc": "Simple REST API for scanning documents and files for threats",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.scanii.com/",
            "category": "anti-malware"
        },
        {
            "api": "URLhaus",
            "desc": "Bulk query and malware sample download service",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://urlhaus-api.abuse.ch/",
            "category": "anti-malware"
        },
        {
            "api": "URLScan.io",
            "desc": "Scan and analyze URLs for malicious content or indicators",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://urlscan.io/about-api/",
            "category": "anti-malware"
        },
        {
            "api": "VirusTotal",
            "desc": "Analyze files and URLs for viruses, malware, and malicious content",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.virustotal.com/en/documentation/public-api/",
            "category": "anti-malware"
        },
        {
            "api": "Web of Trust",
            "desc": "Website reputation and trustworthiness scoring",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://support.mywot.com/hc/en-us/sections/360004477734-API-",
            "category": "anti-malware"
        }
    ],

    'art-design': [
        {
            "api": "Améthyste",
            "desc": "Generate images and profile visuals for Discord users",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.amethyste.moe/",
            "category": "art-design"
        },
        {
            "api": "Art Institute of Chicago",
            "desc": "Access artworks and metadata from the Art Institute of Chicago",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.artic.edu/docs/",
            "category": "art-design"
        },
        {
            "api": "Colormind",
            "desc": "Generate color schemes using deep learning",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://colormind.io/api-access/",
            "category": "art-design"
        },
        {
            "api": "ColourLovers",
            "desc": "Get patterns, palettes, and colors shared by a global community",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.colourlovers.com/api",
            "category": "art-design"
        },
        {
            "api": "Cooper Hewitt",
            "desc": "Smithsonian Design Museum API for design collections",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://collection.cooperhewitt.org/api",
            "category": "art-design"
        },
        {
            "api": "Dribbble",
            "desc": "Discover the world’s top designers & creatives through Dribbble API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.dribbble.com",
            "category": "art-design"
        },
        {
            "api": "EmojiHub",
            "desc": "Retrieve emojis by category or group for creative use",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/cheatsnake/emojihub",
            "category": "art-design"
        },
        {
            "api": "Europeana",
            "desc": "European museums and galleries content search API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pro.europeana.eu/resources/apis/search",
            "category": "art-design"
        },
        {
            "api": "Harvard Art Museums",
            "desc": "Access art collections and data from Harvard Art Museums",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "https://github.com/harvardartmuseums/api-docs",
            "category": "art-design"
        },
        {
            "api": "Icon Horse",
            "desc": "Get favicons for any website, with automatic fallbacks",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://icon.horse",
            "category": "art-design"
        },
        {
            "api": "Iconfinder",
            "desc": "Search and download millions of vector icons",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.iconfinder.com",
            "category": "art-design"
        },
        {
            "api": "Icons8",
            "desc": "Access a large library of free and premium icons",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://img.icons8.com/",
            "category": "art-design"
        },
        {
            "api": "Lordicon",
            "desc": "Beautiful animated icons with JSON-based animations",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://lordicon.com/",
            "category": "art-design"
        },
        {
            "api": "Metropolitan Museum of Art",
            "desc": "Access the Met Museum of Art's collection and metadata",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://metmuseum.github.io/",
            "category": "art-design"
        },
        {
            "api": "Noun Project",
            "desc": "Access millions of icons and symbols from The Noun Project",
            "auth": "OAuth",
            "https": "No",
            "cors": "Unknown",
            "href": "http://api.thenounproject.com/index.html",
            "category": "art-design"
        },
        {
            "api": "PHP-Noise",
            "desc": "Generate random noise background images dynamically",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://php-noise.com/",
            "category": "art-design"
        },
        {
            "api": "Pixel Encounter",
            "desc": "Free SVG icon generator API for developers and designers",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://pixelencounter.com/api",
            "category": "art-design"
        },
        {
            "api": "Rijksmuseum",
            "desc": "Access the Rijksmuseum art collection and object data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.rijksmuseum.nl/object-metadata/api/",
            "category": "art-design"
        },
        {
            "api": "Word Cloud",
            "desc": "Easily create and customize word clouds via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://wordcloudapi.com/",
            "category": "art-design"
        },
        {
            "api": "xColors",
            "desc": "Generate and convert colors with various formats",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://x-colors.herokuapp.com/",
            "category": "art-design"
        }
    ],

    'auth': [
        {
            "api": "Auth0",
            "desc": "Flexible authentication and authorization platform for applications",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://auth0.com",
            "category": "auth"
        },
        {
            "api": "GetOTP",
            "desc": "API to quickly implement one-time password (OTP) verification flow",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://otp.dev/en/docs/",
            "category": "auth"
        },
        {
            "api": "Micro User Service",
            "desc": "User management and authentication microservice API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://m3o.com/user",
            "category": "auth"
        },
        {
            "api": "MojoAuth",
            "desc": "Passwordless authentication platform for secure and seamless login",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://mojoauth.com",
            "category": "auth"
        },
        {
            "api": "SAWO Labs",
            "desc": "Passwordless authentication service for fast and secure user login",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://sawolabs.com",
            "category": "auth"
        },
        {
            "api": "Stytch",
            "desc": "Modern authentication infrastructure for developers and apps",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://stytch.com/",
            "category": "auth"
        },
        {
            "api": "Warrant",
            "desc": "Authorization and access control APIs for your apps",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://warrant.dev/",
            "category": "auth"
        }
    ],

    'blockchain': [
        {
            "api": "Bitquery",
            "desc": "Onchain GraphQL APIs & DEX APIs for blockchain data analysis",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://graphql.bitquery.io/ide",
            "category": "blockchain"
        },
        {
            "api": "Chainlink",
            "desc": "Build hybrid smart contracts with decentralized oracle networks",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://chain.link/developer-resources",
            "category": "blockchain"
        },
        {
            "api": "Chainpoint",
            "desc": "Global network for anchoring data to the Bitcoin blockchain",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tierion.com/chainpoint/",
            "category": "blockchain"
        },
        {
            "api": "Covalent",
            "desc": "Unified API for multi-blockchain data aggregation and analytics",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.covalenthq.com/docs/api/",
            "category": "blockchain"
        },
        {
            "api": "Etherscan",
            "desc": "Ethereum blockchain explorer API for transactions and smart contracts",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://etherscan.io/apis",
            "category": "blockchain"
        },
        {
            "api": "Helium",
            "desc": "Access data from the global decentralized wireless network Helium",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.helium.com/api/blockchain/introduction/",
            "category": "blockchain"
        },
        {
            "api": "Nownodes",
            "desc": "Blockchain-as-a-service API providing access to full nodes and block explorers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://nownodes.io/",
            "category": "blockchain"
        },
        {
            "api": "Steem",
            "desc": "Blockchain-based social media and blogging platform",
            "auth": "No",
            "https": "No",
            "cors": "No",
            "href": "https://developers.steem.io/",
            "category": "blockchain"
        },
        {
            "api": "The Graph",
            "desc": "Decentralized indexing protocol for querying blockchain data via GraphQL",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://thegraph.com",
            "category": "blockchain"
        },
        {
            "api": "Walltime",
            "desc": "Retrieve market information and trading data from Walltime",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://walltime.info/api.html",
            "category": "blockchain"
        },
        {
            "api": "Watchdata",
            "desc": "Reliable API access to Ethereum and other blockchain networks",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.watchdata.io",
            "category": "blockchain"
        }
    ],

    'books': [
        {
            "api": "A Bíblia Digital",
            "desc": "Access multiple versions of the Bible through a simple REST API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://www.abibliadigital.com.br/en",
            "category": "books"
        },
        {
            "api": "Bhagavad Gita",
            "desc": "Shrimad Bhagavad Gita API including translations by 21+ authors in Sanskrit, English, and Hindi",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.bhagavadgitaapi.in",
            "category": "books"
        },
        {
            "api": "Bhagavad Gita",
            "desc": "Access full Bhagavad Gita text and chapters",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://bhagavadgita.io/api",
            "category": "books"
        },
        {
            "api": "Bhagavad Gita Telugu",
            "desc": "Bhagavad Gita API in Telugu and Odia languages",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://gita-api.vercel.app",
            "category": "books"
        },
        {
            "api": "Bible-api",
            "desc": "Free REST Bible API supporting multiple languages",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://bible-api.com/",
            "category": "books"
        },
        {
            "api": "British National Bibliography",
            "desc": "Bibliographic records of books and publications from the British Library",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://bnb.data.bl.uk/",
            "category": "books"
        },
        {
            "api": "Crossref Metadata Search",
            "desc": "Metadata for books, articles, and academic papers via Crossref",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/CrossRef/rest-api-doc",
            "category": "books"
        },
        {
            "api": "Ganjoor",
            "desc": "Access classic Persian poetry, manuscripts, recitations, and music tracks",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.ganjoor.net",
            "category": "books"
        },
        {
            "api": "Google Books",
            "desc": "Search and access Google Books data and book covers",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/books/",
            "category": "books"
        },
        {
            "api": "GurbaniNow",
            "desc": "Fast and accurate Gurbani RESTful API with scripture search",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/GurbaniNow/api",
            "category": "books"
        },
        {
            "api": "Gutendex",
            "desc": "Web API for accessing Project Gutenberg’s free eBook library",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://gutendex.com/",
            "category": "books"
        },
        {
            "api": "Open Library",
            "desc": "Retrieve books, covers, and author data from Open Library",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://openlibrary.org/developers/api",
            "category": "books"
        },
        {
            "api": "Penguin Publishing",
            "desc": "Retrieve Penguin Random House books and related metadata",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "http://www.penguinrandomhouse.biz/webservices/rest/",
            "category": "books"
        },
        {
            "api": "PoetryDB",
            "desc": "Access an extensive collection of poems and poets via REST API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/thundercomb/poetrydb#readme",
            "category": "books"
        },
        {
            "api": "Quran",
            "desc": "RESTful API for the Quran with multi-language translations",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://quran.api-docs.io/",
            "category": "books"
        },
        {
            "api": "Quran Cloud",
            "desc": "Retrieve Quran verses, Surahs, and translations via API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://alquran.cloud/api",
            "category": "books"
        },
        {
            "api": "Quran-api",
            "desc": "Free Quran API with over 90 languages and 400+ translations",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/fawazahmed0/quran-api#readme",
            "category": "books"
        },
        {
            "api": "Rig Veda",
            "desc": "Access verses, poets, and categories from Rig Veda scriptures",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://aninditabasu.github.io/indica/html/rv.html",
            "category": "books"
        },
        {
            "api": "The Bible",
            "desc": "Comprehensive Bible API offering multiple translations and resources",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.api.bible",
            "category": "books"
        },
        {
            "api": "Thirukkural",
            "desc": "Access 1330 Thirukkural poems and explanations in Tamil and English",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api-thirukkural.web.app/",
            "category": "books"
        },
        {
            "api": "Vedic Society",
            "desc": "Descriptions of names, places, and entities from Vedic literature",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://aninditabasu.github.io/indica/html/vs.html",
            "category": "books"
        },
        {
            "api": "Wizard World",
            "desc": "Retrieve information about characters, spells, and data from the Harry Potter universe",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://wizard-world-api.herokuapp.com/swagger/index.html",
            "category": "books"
        },
        {
            "api": "Wolne Lektury",
            "desc": "API for accessing e-books and metadata from WolneLektury.pl",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://wolnelektury.pl/api/",
            "category": "books"
        }
    ],

    'business': [
        {
            "api": "Apache Superset",
            "desc": "API to manage BI dashboards, charts, and data sources in Superset",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://superset.apache.org/docs/api",
            "category": "business"
        },
        {
            "api": "Charity Search",
            "desc": "Non-profit and charity organization data lookup API",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "http://charityapi.orghunter.com/",
            "category": "business"
        },
        {
            "api": "Clearbit Logo",
            "desc": "Retrieve company logos and branding information by domain",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://clearbit.com/docs#logo-api",
            "category": "business"
        },
        {
            "api": "Domainsdb.info",
            "desc": "Search registered domain names and WHOIS information",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://domainsdb.info/",
            "category": "business"
        },
        {
            "api": "Freelancer",
            "desc": "API for hiring freelancers, posting projects, and managing jobs",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.freelancer.com",
            "category": "business"
        },
        {
            "api": "Gmail",
            "desc": "RESTful access to Gmail inbox, threads, and message management",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/gmail/api/",
            "category": "business"
        },
        {
            "api": "Google Analytics",
            "desc": "Collect, configure, and analyze analytics data for websites and apps",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/analytics",
            "category": "business"
        },
        {
            "api": "Instatus",
            "desc": "Update and manage incidents and maintenance messages on your status page",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://instatus.com/help/api",
            "category": "business"
        },
        {
            "api": "Mailchimp",
            "desc": "Send email marketing campaigns and manage contacts",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://mailchimp.com/developer/",
            "category": "business"
        },
        {
            "api": "Mailjet",
            "desc": "Send marketing and transactional emails using MJML or HTML templates",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.mailjet.com/",
            "category": "business"
        },
        {
            "api": "Markerapi",
            "desc": "Trademark search and lookup API",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://markerapi.com",
            "category": "business"
        },
        {
            "api": "ORB Intelligence",
            "desc": "Company lookup API for business and industry information",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.orb-intelligence.com/docs/",
            "category": "business"
        },
        {
            "api": "Redash",
            "desc": "Access queries, dashboards, and data visualizations from Redash",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://redash.io/help/user-guide/integrations-and-api/api",
            "category": "business"
        },
        {
            "api": "Smartsheet",
            "desc": "Programmatic access to Smartsheet data, sheets, and account info",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "No",
            "href": "https://smartsheet.redoc.ly/",
            "category": "business"
        },
        {
            "api": "Square",
            "desc": "Payments API for processing transactions, refunds, and customer checkout",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.squareup.com/reference/square",
            "category": "business"
        },
        {
            "api": "SwiftKanban",
            "desc": "Kanban project management API to visualize and improve workflows",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.digite.com/knowledge-base/swiftkanban/article/api-for-swift-kanban-web-services/#restapi",
            "category": "business"
        },
        {
            "api": "Tenders in Hungary",
            "desc": "Retrieve procurement data for Hungary in JSON format",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tenders.guru/hu/api",
            "category": "business"
        },
        {
            "api": "Tenders in Poland",
            "desc": "Retrieve procurement data for Poland in JSON format",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tenders.guru/pl/api",
            "category": "business"
        },
        {
            "api": "Tenders in Romania",
            "desc": "Retrieve procurement data for Romania in JSON format",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tenders.guru/ro/api",
            "category": "business"
        },
        {
            "api": "Tenders in Spain",
            "desc": "Retrieve procurement data for Spain in JSON format",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tenders.guru/es/api",
            "category": "business"
        },
        {
            "api": "Tenders in Ukraine",
            "desc": "Retrieve procurement data for Ukraine in JSON format",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tenders.guru/ua/api",
            "category": "business"
        },
        {
            "api": "Tomba Email Finder",
            "desc": "Find and verify professional emails for B2B marketing and outreach",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://tomba.io/api",
            "category": "business"
        },
        {
            "api": "Trello",
            "desc": "Manage boards, lists, and cards to organize projects and tasks",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.trello.com/",
            "category": "business"
        }
    ],

    'calendar': [
        {
            "api": "Abstract Public Holidays",
            "desc": "Access national, regional, and religious holidays worldwide via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.abstractapi.com/holidays-api",
            "category": "calendar"
        },
        {
            "api": "Calendarific",
            "desc": "Global holiday and observance API for countries, regions, and religions",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://calendarific.com/",
            "category": "calendar"
        },
        {
            "api": "Church Calendar",
            "desc": "Catholic liturgical calendar with daily readings and feast days",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://calapi.inadiutorium.cz/",
            "category": "calendar"
        },
        {
            "api": "Czech Namedays Calendar",
            "desc": "Lookup Czech name days and retrieve corresponding celebration dates",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://svatky.adresa.info",
            "category": "calendar"
        },
        {
            "api": "Festivo Public Holidays",
            "desc": "Advanced and fast public holiday and observance service",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.getfestivo.com/docs/products/public-holidays-api/intro",
            "category": "calendar"
        },
        {
            "api": "Google Calendar",
            "desc": "Create, read, and modify Google Calendar events programmatically",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/google-apps/calendar/",
            "category": "calendar"
        },
        {
            "api": "Hebrew Calendar",
            "desc": "Convert between Gregorian and Hebrew calendars, fetch Shabbat and holiday times",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://www.hebcal.com/home/developer-apis",
            "category": "calendar"
        },
        {
            "api": "Holidays",
            "desc": "Provides historical and upcoming public holiday data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://holidayapi.com/",
            "category": "calendar"
        },
        {
            "api": "LectServe",
            "desc": "Protestant liturgical calendar API",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.lectserve.com",
            "category": "calendar"
        },
        {
            "api": "Nager.Date",
            "desc": "Provides public holidays for more than 90 countries in JSON format",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://date.nager.at",
            "category": "calendar"
        },
        {
            "api": "Namedays Calendar",
            "desc": "Fetch name days for multiple countries and regions",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://nameday.abalin.net",
            "category": "calendar"
        },
        {
            "api": "Non-Working Days (ICS)",
            "desc": "Database of ICS files listing non-working days for various regions",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/gadael/icsdb",
            "category": "calendar"
        },
        {
            "api": "Non-Working Days API",
            "desc": "Check working, non-working, or short days for Russia, CIS, USA and others",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://isdayoff.ru",
            "category": "calendar"
        },
        {
            "api": "Russian Calendar",
            "desc": "Check if a date is a Russian holiday or not via API",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://github.com/egno/work-calendar",
            "category": "calendar"
        },
        {
            "api": "UK Bank Holidays",
            "desc": "Official UK government API for bank holidays across England, Scotland, Wales, and Northern Ireland",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.gov.uk/bank-holidays.json",
            "category": "calendar"
        }
    ],

    'cloud': [
        {
            "api": "AnonFiles",
            "desc": "Upload and share files anonymously and securely",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://anonfiles.com/docs/api",
            "category": "cloud"
        },
        {
            "api": "BayFiles",
            "desc": "Simple file upload and sharing service",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bayfiles.com/docs/api",
            "category": "cloud"
        },
        {
            "api": "Box",
            "desc": "Enterprise-grade file sharing and cloud storage platform",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.box.com/",
            "category": "cloud"
        },
        {
            "api": "ddownload",
            "desc": "File sharing and hosting API for programmatic uploads and downloads",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://ddownload.com/api",
            "category": "cloud"
        },
        {
            "api": "Dropbox",
            "desc": "Cloud storage and collaboration platform for individuals and teams",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.dropbox.com/developers",
            "category": "cloud"
        },
        {
            "api": "File.io",
            "desc": "Simple, secure, and anonymous file sharing with automatic deletion",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.file.io",
            "category": "cloud"
        },
        {
            "api": "GoFile",
            "desc": "Free file storage API with unlimited upload size and sharing links",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://gofile.io/api",
            "category": "cloud"
        },
        {
            "api": "Google Drive",
            "desc": "File storage and synchronization service by Google with full API access",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/drive/",
            "category": "cloud"
        },
        {
            "api": "Gyazo",
            "desc": "Capture and share screenshots, GIFs, and videos instantly",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://gyazo.com/api/docs",
            "category": "cloud"
        },
        {
            "api": "Imgbb",
            "desc": "Private image hosting and sharing platform with easy uploads via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.imgbb.com/",
            "category": "cloud"
        },
        {
            "api": "OneDrive",
            "desc": "Microsoft’s cloud file sharing and storage API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.microsoft.com/onedrive",
            "category": "cloud"
        },
        {
            "api": "Pantry",
            "desc": "Free cloud JSON storage for small projects and APIs",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://getpantry.cloud/",
            "category": "cloud"
        },
        {
            "api": "Pastebin",
            "desc": "Text and code storage API for pasting and sharing snippets online",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pastebin.com/doc_api",
            "category": "cloud"
        },
        {
            "api": "Pinata",
            "desc": "IPFS pinning and file management service for decentralized apps",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.pinata.cloud/",
            "category": "cloud"
        },
        {
            "api": "Quip",
            "desc": "Cloud-based document collaboration and file sharing for teams",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://quip.com/dev/automation/documentation",
            "category": "cloud"
        },
        {
            "api": "Storj",
            "desc": "Decentralized open-source cloud storage network for developers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.storj.io/dcs/",
            "category": "cloud"
        },
        {
            "api": "The Null Pointer",
            "desc": "Fast and minimal file hosting and URL shortening service",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://0x0.st",
            "category": "cloud"
        },
        {
            "api": "Web3 Storage",
            "desc": "Decentralized file storage with IPFS and Filecoin, offering 1TB free space",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://web3.storage/",
            "category": "cloud"
        }
    ],

    'continuous-integration': [
        {
            "api": "Azure DevOps Health",
            "desc": "Monitor the health of Azure DevOps resources and diagnose service issues in real time",
            "auth": "apiKey",
            "https": "No",
            "cors": "No",
            "href": "https://docs.microsoft.com/en-us/rest/api/resourcehealth",
            "category": "continuous-integration"
        },
        {
            "api": "Bitrise",
            "desc": "Continuous integration and delivery platform for automating build and deployment workflows",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api-docs.bitrise.io/",
            "category": "continuous-integration"
        },
        {
            "api": "Buddy",
            "desc": "Fast CI/CD platform to build, test, and deploy applications automatically",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://buddy.works/docs/api/getting-started/overview",
            "category": "continuous-integration"
        },
        {
            "api": "CircleCI",
            "desc": "Automate your development workflow with continuous integration and delivery pipelines",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://circleci.com/docs/api/v1-reference/",
            "category": "continuous-integration"
        },
        {
            "api": "Codeship",
            "desc": "Cloud-based continuous integration platform for testing and deploying your code",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.cloudbees.com/docs/cloudbees-codeship/latest/api-overview/",
            "category": "continuous-integration"
        },
        {
            "api": "Travis CI",
            "desc": "Sync GitHub projects with Travis CI to test and deploy code automatically",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.travis-ci.com/api/",
            "category": "continuous-integration"
        }
    ],

    'cryptocurrency': [
        {
            "api": "0x",
            "desc": "Query token and pool stats across various decentralized liquidity pools",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://0x.org/api",
            "category": "cryptocurrency"
        },
        {
            "api": "1inch",
            "desc": "Decentralized exchange aggregator API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://1inch.io/api/",
            "category": "cryptocurrency"
        },
        {
            "api": "Alchemy Ethereum",
            "desc": "Ethereum Node-as-a-Service provider with enhanced APIs and analytics",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.alchemy.com/alchemy/",
            "category": "cryptocurrency"
        },
        {
            "api": "apilayer coinlayer",
            "desc": "Real-time cryptocurrency exchange rate API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://coinlayer.com",
            "category": "cryptocurrency"
        },
        {
            "api": "Binance",
            "desc": "Comprehensive API for trading and market data on Binance Exchange",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/binance/binance-spot-api-docs",
            "category": "cryptocurrency"
        },
        {
            "api": "Bitcambio",
            "desc": "Retrieve traded asset data from Bitcambio Exchange",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://nova.bitcambio.com.br/api/v3/docs#a-public",
            "category": "cryptocurrency"
        },
        {
            "api": "BitcoinAverage",
            "desc": "Digital asset price and market data for blockchain industry",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://apiv2.bitcoinaverage.com/",
            "category": "cryptocurrency"
        },
        {
            "api": "BitcoinCharts",
            "desc": "Financial and technical Bitcoin network data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bitcoincharts.com/about/exchanges/",
            "category": "cryptocurrency"
        },
        {
            "api": "Bitfinex",
            "desc": "Cryptocurrency trading and exchange platform API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.bitfinex.com/docs",
            "category": "cryptocurrency"
        },
        {
            "api": "Bitmex",
            "desc": "Real-time cryptocurrency derivatives trading API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.bitmex.com/app/apiOverview",
            "category": "cryptocurrency"
        },
        {
            "api": "Bittrex",
            "desc": "Next-generation crypto trading platform API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bittrex.github.io/api/v3",
            "category": "cryptocurrency"
        },
        {
            "api": "Block",
            "desc": "Bitcoin payments, wallet, and transaction data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://block.io/docs/basic",
            "category": "cryptocurrency"
        },
        {
            "api": "Blockchain",
            "desc": "Bitcoin wallet and transaction data API from Blockchain.com",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.blockchain.com/api",
            "category": "cryptocurrency"
        },
        {
            "api": "blockfrost Cardano",
            "desc": "Interact with the Cardano blockchain mainnet and testnets",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://blockfrost.io/",
            "category": "cryptocurrency"
        },
        {
            "api": "Brave NewCoin",
            "desc": "Real-time and historical cryptocurrency data from 200+ exchanges",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bravenewcoin.com/developers",
            "category": "cryptocurrency"
        },
        {
            "api": "BtcTurk",
            "desc": "Real-time cryptocurrency data and trading API from BtcTurk",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.btcturk.com/",
            "category": "cryptocurrency"
        },
        {
            "api": "Bybit",
            "desc": "API for derivatives and spot cryptocurrency trading",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bybit-exchange.github.io/docs/linear/#t-introduction",
            "category": "cryptocurrency"
        },
        {
            "api": "CoinAPI",
            "desc": "Unified cryptocurrency exchange data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://docs.coinapi.io/",
            "category": "cryptocurrency"
        },
        {
            "api": "Coinbase",
            "desc": "Cryptocurrency wallet and payment API from Coinbase",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.coinbase.com",
            "category": "cryptocurrency"
        },
        {
            "api": "CoinGecko",
            "desc": "Comprehensive cryptocurrency market data API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.coingecko.com/api",
            "category": "cryptocurrency"
        },
        {
            "api": "CoinMarketCap",
            "desc": "Cryptocurrency price and market capitalization API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://coinmarketcap.com/api/",
            "category": "cryptocurrency"
        },
        {
            "api": "CryptoCompare",
            "desc": "Cryptocurrency price, historical data, and comparison API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.cryptocompare.com/api#",
            "category": "cryptocurrency"
        },
        {
            "api": "FTX",
            "desc": "Complete REST and WebSocket API for FTX trading",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.ftx.com/",
            "category": "cryptocurrency"
        },
        {
            "api": "Huobi",
            "desc": "Comprehensive trading API for Huobi Exchange",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://huobiapi.github.io/docs/spot/v1/en/",
            "category": "cryptocurrency"
        },
        {
            "api": "Kraken",
            "desc": "REST API for Kraken Exchange to access crypto data and trading",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.kraken.com/rest/",
            "category": "cryptocurrency"
        },
        {
            "api": "Nomics",
            "desc": "Historical and real-time cryptocurrency prices and market data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://nomics.com/docs/",
            "category": "cryptocurrency"
        },
        {
            "api": "OKEx",
            "desc": "API for trading and data from OKEx Exchange",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.okx.com/docs-v5/en/",
            "category": "cryptocurrency"
        },
        {
            "api": "Solana JSON RPC",
            "desc": "Interact programmatically with the Solana blockchain network",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.solana.com/developing/clients/jsonrpc-api",
            "category": "cryptocurrency"
        },
        {
            "api": "VALR",
            "desc": "Cryptocurrency exchange API for South Africa-based VALR",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.valr.com/",
            "category": "cryptocurrency"
        },
        {
            "api": "WorldCoinIndex",
            "desc": "Real-time cryptocurrency price API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.worldcoinindex.com/apiservice",
            "category": "cryptocurrency"
        }
    ],

    'currency-exchange': [
        {
            "api": "1Forge",
            "desc": "Real-time forex and currency market data with exchange rate updates",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://1forge.com/forex-data-api/api-documentation",
            "category": "currency-exchange"
        },
        {
            "api": "Amdoren",
            "desc": "Free currency API supporting over 150 global currencies",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.amdoren.com/currency-api/",
            "category": "currency-exchange"
        },
        {
            "api": "apilayer fixer.io",
            "desc": "Reliable exchange rate and currency conversion API",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "https://fixer.io",
            "category": "currency-exchange"
        },
        {
            "api": "Bank of Russia",
            "desc": "Official exchange rates and currency conversion data from the Bank of Russia",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.cbr.ru/development/SXML/",
            "category": "currency-exchange"
        },
        {
            "api": "Currency-api",
            "desc": "Free exchange rate API with 150+ currencies and no request limits",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/fawazahmed0/currency-api#readme",
            "category": "currency-exchange"
        },
        {
            "api": "CurrencyFreaks",
            "desc": "Current and historical exchange rates with free plan for 1K requests per month",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://currencyfreaks.com/",
            "category": "currency-exchange"
        },
        {
            "api": "Currencylayer",
            "desc": "Real-time exchange rates and currency conversion data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://currencylayer.com/documentation",
            "category": "currency-exchange"
        },
        {
            "api": "CurrencyScoop",
            "desc": "Real-time and historical foreign exchange rates in JSON format",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://currencyscoop.com/api-documentation",
            "category": "currency-exchange"
        },
        {
            "api": "Czech National Bank",
            "desc": "Official exchange rate data provided by the Czech National Bank",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.xml",
            "category": "currency-exchange"
        },
        {
            "api": "Economia.Awesome",
            "desc": "Portuguese open API for currency prices and conversion with no limits",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.awesomeapi.com.br/api-de-moedas",
            "category": "currency-exchange"
        },
        {
            "api": "ExchangeRate-API",
            "desc": "Free and easy-to-use currency conversion API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.exchangerate-api.com",
            "category": "currency-exchange"
        },
        {
            "api": "Exchangerate.host",
            "desc": "Free API for foreign exchange and cryptocurrency rates",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://exchangerate.host",
            "category": "currency-exchange"
        },
        {
            "api": "Exchangeratesapi.io",
            "desc": "Exchange rate API for currency conversion and financial data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://exchangeratesapi.io",
            "category": "currency-exchange"
        },
        {
            "api": "Frankfurter",
            "desc": "Open-source exchange rate and currency conversion API with time series support",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.frankfurter.app/docs",
            "category": "currency-exchange"
        },
        {
            "api": "FreeForexAPI",
            "desc": "Real-time foreign exchange rate data for major currency pairs",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://freeforexapi.com/Home/Api",
            "category": "currency-exchange"
        },
        {
            "api": "National Bank of Poland",
            "desc": "Official exchange rate data from the National Bank of Poland (XML and JSON)",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "http://api.nbp.pl/en.html",
            "category": "currency-exchange"
        },
        {
            "api": "VATComply.com",
            "desc": "Exchange rates, geolocation, and VAT number validation API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.vatcomply.com/documentation",
            "category": "currency-exchange"
        }
    ],

    'data-validation': [
        {
            "api": "Lob.com",
            "desc": "Verify and standardize U.S. postal addresses in real time",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://lob.com/",
            "category": "data-validation"
        },
        {
            "api": "Postman Echo",
            "desc": "Simple API testing service to echo back HTTP requests for debugging",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.postman-echo.com",
            "category": "data-validation"
        },
        {
            "api": "PurgoMalum",
            "desc": "Filter and validate content against profanity and obscenity",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.purgomalum.com",
            "category": "data-validation"
        },
        {
            "api": "US Autocomplete",
            "desc": "Provide real-time address suggestions for faster data entry",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.smarty.com/docs/cloud/us-autocomplete-pro-api",
            "category": "data-validation"
        },
        {
            "api": "US Extract",
            "desc": "Extract postal addresses from raw text or emails automatically",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.smarty.com/products/apis/us-extract-api",
            "category": "data-validation"
        },
        {
            "api": "US Street Address",
            "desc": "Validate, correct, and append metadata for any U.S. address",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.smarty.com/docs/cloud/us-street-api",
            "category": "data-validation"
        },
        {
            "api": "vatlayer",
            "desc": "Validate VAT numbers and retrieve company information across the EU",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://vatlayer.com/documentation",
            "category": "data-validation"
        }
    ],

    'dictionaries': [
        {
            "api": "Chinese Character Web",
            "desc": "Chinese character definitions, pronunciations, and stroke data",
            "auth": "No",
            "https": "No",
            "cors": "No",
            "href": "http://ccdb.hemiola.com/",
            "category": "dictionaries"
        },
        {
            "api": "Chinese Text Project",
            "desc": "Digital library and dictionary for pre-modern Chinese texts",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://ctext.org/tools/api",
            "category": "dictionaries"
        },
        {
            "api": "Collins",
            "desc": "Bilingual dictionary and thesaurus data from Collins",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.collinsdictionary.com/api/v1/documentation/html/",
            "category": "dictionaries"
        },
        {
            "api": "Free Dictionary",
            "desc": "Open-source dictionary API providing definitions, examples, and synonyms",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://dictionaryapi.dev/",
            "category": "dictionaries"
        },
        {
            "api": "Indonesia Dictionary",
            "desc": "Kamus Besar Bahasa Indonesia (KBBI) API for Indonesian word definitions",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://new-kbbi-api.herokuapp.com/",
            "category": "dictionaries"
        },
        {
            "api": "Lingua Robot",
            "desc": "Word meanings, pronunciations, synonyms, antonyms, and grammatical data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.linguarobot.io",
            "category": "dictionaries"
        },
        {
            "api": "Merriam-Webster",
            "desc": "Comprehensive dictionary and thesaurus API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://dictionaryapi.com/",
            "category": "dictionaries"
        },
        {
            "api": "OwlBot",
            "desc": "Simple dictionary API with examples, pronunciation, and images",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://owlbot.info/",
            "category": "dictionaries"
        },
        {
            "api": "Oxford",
            "desc": "Access word definitions, translations, and grammar data from Oxford Dictionaries",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://developer.oxforddictionaries.com/",
            "category": "dictionaries"
        },
        {
            "api": "Synonyms",
            "desc": "Retrieve synonyms, antonyms, and related words via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.synonyms.com/synonyms_api.php",
            "category": "dictionaries"
        },
        {
            "api": "Wiktionary",
            "desc": "Collaborative, multilingual dictionary data from Wikimedia",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://en.wiktionary.org/w/api.php",
            "category": "dictionaries"
        },
        {
            "api": "Wordnik",
            "desc": "Large-scale English dictionary API with word definitions and usage examples",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.wordnik.com",
            "category": "dictionaries"
        },
        {
            "api": "Words",
            "desc": "Definitions, examples, and synonyms for over 150,000 words",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.wordsapi.com/docs/",
            "category": "dictionaries"
        }
    ],

    'productivity': [
        {
            "api": "Airtable",
            "desc": "Integrate Airtable databases and automate workflows via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://airtable.com/api",
            "category": "productivity"
        },
        {
            "api": "Api2Convert",
            "desc": "Online file conversion API supporting multiple formats",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.api2convert.com/",
            "category": "productivity"
        },
        {
            "api": "apilayer pdflayer",
            "desc": "Convert HTML or URLs into PDF documents easily",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pdflayer.com",
            "category": "productivity"
        },
        {
            "api": "Asana",
            "desc": "Programmatic access to manage tasks, projects, and teams in Asana",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developers.asana.com/docs",
            "category": "productivity"
        },
        {
            "api": "ClickUp",
            "desc": "Powerful project management and productivity tool for teams",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://clickup.com/api",
            "category": "productivity"
        },
        {
            "api": "Clockify",
            "desc": "Time tracking and reporting API for teams and freelancers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://clockify.me/developers-api",
            "category": "productivity"
        },
        {
            "api": "CloudConvert",
            "desc": "Convert audio, video, documents, images, and more with REST API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://cloudconvert.com/api/v2",
            "category": "productivity"
        },
        {
            "api": "Cloudmersive Document and Data Conversion",
            "desc": "Convert files (HTML, Office, images) to PDF or PNG easily",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://cloudmersive.com/convert-api",
            "category": "productivity"
        },
        {
            "api": "Code::Stats",
            "desc": "Automatic coding activity and time tracking for developers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://codestats.net/api-docs",
            "category": "productivity"
        },
        {
            "api": "CraftMyPDF",
            "desc": "Generate dynamic PDFs from templates using an online editor",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://craftmypdf.com",
            "category": "productivity"
        },
        {
            "api": "Flowdash",
            "desc": "Automate and track business workflows with an easy-to-use API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.flowdash.com/docs/api-introduction",
            "category": "productivity"
        },
        {
            "api": "Html2PDF",
            "desc": "Convert HTML pages or URLs to PDF format instantly",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://html2pdf.app/",
            "category": "productivity"
        },
        {
            "api": "iLovePDF",
            "desc": "All-in-one PDF management API (convert, merge, split, extract text)",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developer.ilovepdf.com/",
            "category": "productivity"
        },
        {
            "api": "JIRA",
            "desc": "API for issue tracking and agile project management in JIRA",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.atlassian.com/server/jira/platform/rest-apis/",
            "category": "productivity"
        },
        {
            "api": "Mattermost",
            "desc": "Open source collaboration platform for developers and teams",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.mattermost.com/",
            "category": "productivity"
        },
        {
            "api": "Mercury",
            "desc": "Extract and clean content from web pages using Mercury Parser",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://mercury.postlight.com/web-parser/",
            "category": "productivity"
        },
        {
            "api": "Monday",
            "desc": "Access and modify data from Monday.com work management platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.developer.monday.com/docs",
            "category": "productivity"
        },
        {
            "api": "Notion",
            "desc": "Integrate and manage Notion pages, databases, and content via API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.notion.com/docs/getting-started",
            "category": "productivity"
        },
        {
            "api": "PandaDoc",
            "desc": "Create, send, and e-sign documents programmatically via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://developers.pandadoc.com",
            "category": "productivity"
        },
        {
            "api": "Pocket",
            "desc": "Bookmarking and read-it-later service API for content management",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://getpocket.com/developer/",
            "category": "productivity"
        },
        {
            "api": "Podio",
            "desc": "Collaborative work and productivity platform for teams",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.podio.com",
            "category": "productivity"
        },
        {
            "api": "PrexView",
            "desc": "Transform XML or JSON data into PDF, HTML, or image outputs",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://prexview.com",
            "category": "productivity"
        },
        {
            "api": "Restpack",
            "desc": "Generate screenshots, convert HTML to PDF, and extract web content",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://restpack.io/",
            "category": "productivity"
        },
        {
            "api": "Todoist",
            "desc": "Task management and to-do list API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.todoist.com",
            "category": "productivity"
        },
        {
            "api": "Vector Express v2.0",
            "desc": "Free and fast vector file conversion API",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://vector.express",
            "category": "productivity"
        },
        {
            "api": "WakaTime",
            "desc": "Automated coding activity tracking and analytics for developers",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://wakatime.com/developers",
            "category": "productivity"
        },
        {
            "api": "Zube",
            "desc": "Agile project management platform for developers",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://zube.io/docs/api",
            "category": "productivity"
        }
    ],

    'email': [
        {
            "api": "Abstract Email Validation",
            "desc": "Validate email addresses for deliverability, syntax, and spam risk detection",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.abstractapi.com/email-verification-validation-api",
            "category": "email"
        },
        {
            "api": "apilayer mailboxlayer",
            "desc": "Real-time email address validation and verification service",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://mailboxlayer.com",
            "category": "email"
        },
        {
            "api": "Cloudmersive Validate",
            "desc": "Validate email addresses, phone numbers, VAT numbers, and domain names",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://cloudmersive.com/validate-api",
            "category": "email"
        },
        {
            "api": "Disify",
            "desc": "Detect disposable, temporary, and invalid email addresses instantly",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.disify.com/",
            "category": "email"
        },
        {
            "api": "DropMail",
            "desc": "GraphQL API for generating and managing temporary email inboxes",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://dropmail.me/api/#live-demo",
            "category": "email"
        },
        {
            "api": "EVA",
            "desc": "Simple and fast email validation API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://eva.pingutil.com/",
            "category": "email"
        },
        {
            "api": "Guerrilla Mail",
            "desc": "API for creating disposable and temporary email addresses",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.guerrillamail.com/GuerrillaMailAPI.html",
            "category": "email"
        },
        {
            "api": "ImprovMX",
            "desc": "API for custom email forwarding and routing",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://improvmx.com/api",
            "category": "email"
        },
        {
            "api": "Kickbox",
            "desc": "Free and reliable email verification API for real-time validation",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://open.kickbox.com/",
            "category": "email"
        },
        {
            "api": "mail.gw",
            "desc": "Temporary email API for creating disposable inboxes (10-minute mail)",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.mail.gw",
            "category": "email"
        },
        {
            "api": "mail.tm",
            "desc": "API for generating temporary and anonymous email addresses",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.mail.tm",
            "category": "email"
        },
        {
            "api": "MailboxValidator",
            "desc": "Validate and verify email addresses to improve deliverability",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.mailboxvalidator.com/api-email-free",
            "category": "email"
        },
        {
            "api": "MailCheck.ai",
            "desc": "Detect and block disposable or fake email addresses during signup",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.mailcheck.ai/#documentation",
            "category": "email"
        },
        {
            "api": "Mailtrap",
            "desc": "Safe email testing tool for development and staging environments",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://mailtrap.docs.apiary.io/#",
            "category": "email"
        },
        {
            "api": "Sendgrid",
            "desc": "Cloud-based SMTP and transactional email sending API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.sendgrid.com/api-reference/",
            "category": "email"
        },
        {
            "api": "Sendinblue",
            "desc": "Marketing and transactional email/SMS API with advanced analytics",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.sendinblue.com/docs",
            "category": "email"
        },
        {
            "api": "Verifier",
            "desc": "API for verifying whether an email address is active and valid",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://verifier.meetchopra.com/docs#/",
            "category": "email"
        }
    ],

    'entertainment': [
        {
            "api": "chucknorris.io",
            "desc": "JSON API providing hand-curated Chuck Norris jokes and quotes",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.chucknorris.io",
            "category": "entertainment"
        },
        {
            "api": "Corporate Buzz Words",
            "desc": "Generate random corporate buzzwords and business jargon",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/sameerkumar18/corporate-bs-generator-api",
            "category": "entertainment"
        },
        {
            "api": "Excuser",
            "desc": "Get random funny excuses for various situations (work, school, etc.)",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://excuser.herokuapp.com/",
            "category": "entertainment"
        },
        {
            "api": "Fun Fact",
            "desc": "Retrieve random fun and interesting facts from the FFA database",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.aakhilv.me",
            "category": "entertainment"
        },
        {
            "api": "Imgflip",
            "desc": "Get popular memes and meme templates from Imgflip",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://imgflip.com/api",
            "category": "entertainment"
        },
        {
            "api": "Meme Maker",
            "desc": "Create your own custom memes programmatically using a simple REST API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://mememaker.github.io/API/",
            "category": "entertainment"
        },
        {
            "api": "NaMoMemes",
            "desc": "Get and generate memes related to Narendra Modi",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/theIYD/NaMoMemes",
            "category": "entertainment"
        },
        {
            "api": "Random Useless Facts",
            "desc": "Fetch useless yet true and entertaining random facts",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://uselessfacts.jsph.pl/",
            "category": "entertainment"
        },
        {
            "api": "Techy",
            "desc": "Generate random techy phrases that sound smart and futuristic",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://techy-api.vercel.app/",
            "category": "entertainment"
        },
        {
            "api": "Yo Momma Jokes",
            "desc": "REST API serving random 'Yo Momma' jokes and roasts",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/beanboi7/yomomma-apiv2",
            "category": "entertainment"
        }
    ],

    'environment': [
        {
            "api": "BreezoMeter Pollen",
            "desc": "Daily forecast of pollen conditions and allergy data for specific locations",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.breezometer.com/api-documentation/pollen-api/v2/",
            "category": "environment"
        },
        {
            "api": "Carbon Interface",
            "desc": "Calculate CO₂ emissions estimates for various carbon-emitting activities",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.carboninterface.com/",
            "category": "environment"
        },
        {
            "api": "Climatiq",
            "desc": "Estimate the environmental footprint for a wide range of emission-generating activities",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.climatiq.io",
            "category": "environment"
        },
        {
            "api": "Cloverly",
            "desc": "Calculate and offset the environmental impact of carbon-intensive activities in real time",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.cloverly.com/carbon-offset-documentation",
            "category": "environment"
        },
        {
            "api": "CO2 Offset",
            "desc": "Calculate and validate the carbon footprint for activities and offset tracking",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://co2offset.io/api.html",
            "category": "environment"
        },
        {
            "api": "Danish Data Service Energi",
            "desc": "Access open energy data from Denmark’s Energinet for sustainability insights",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.energidataservice.dk/",
            "category": "environment"
        },
        {
            "api": "GrünstromIndex",
            "desc": "Green Power Index (Grünstromindex) for Germany, showing renewable energy share in the grid",
            "auth": "No",
            "https": "No",
            "cors": "Yes",
            "href": "https://gruenstromindex.de/",
            "category": "environment"
        },
        {
            "api": "IQAir",
            "desc": "Global air quality and weather monitoring data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.iqair.com/air-pollution-data-api",
            "category": "environment"
        },
        {
            "api": "Luchtmeetnet",
            "desc": "Real-time and forecasted air quality components for The Netherlands (RIVM data)",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api-docs.luchtmeetnet.nl/",
            "category": "environment"
        },
        {
            "api": "National Grid ESO",
            "desc": "Open electricity and energy system data from Great Britain's National Grid ESO",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.nationalgrideso.com/",
            "category": "environment"
        },
        {
            "api": "OpenAQ",
            "desc": "Access open global air quality data aggregated from various sources",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.openaq.org/",
            "category": "environment"
        },
        {
            "api": "PM2.5 Open Data Portal",
            "desc": "Retrieve data from open low-cost PM2.5 air quality sensors worldwide",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pm25.lass-net.org/#apis",
            "category": "environment"
        },
        {
            "api": "PM25.in",
            "desc": "Access real-time air quality data across China",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.pm25.in/api_doc",
            "category": "environment"
        },
        {
            "api": "PVWatts",
            "desc": "Estimate energy production of photovoltaic (PV) systems based on location and configuration",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.nrel.gov/docs/solar/pvwatts/v6/",
            "category": "environment"
        },
        {
            "api": "Srp Energy",
            "desc": "Retrieve hourly energy usage reports for SRP customers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://srpenergy-api-client-python.readthedocs.io/en/latest/api.html",
            "category": "environment"
        },
        {
            "api": "UK Carbon Intensity",
            "desc": "Official Carbon Intensity API for Great Britain, tracking electricity generation emissions",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://carbon-intensity.github.io/api-definitions/#carbon-intensity-api-v1-0-0",
            "category": "environment"
        },
        {
            "api": "Website Carbon",
            "desc": "Estimate the carbon footprint of loading and hosting web pages",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.websitecarbon.com/",
            "category": "environment"
        }
    ],

    'events': [
        {
            "api": "Eventbrite",
            "desc": "Discover, search, and manage events using the official Eventbrite API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.eventbrite.com/platform/api/",
            "category": "events"
        },
        {
            "api": "SeatGeek",
            "desc": "Search and browse events, venues, and performers with pricing and availability data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://platform.seatgeek.com/",
            "category": "events"
        },
        {
            "api": "Ticketmaster",
            "desc": "Access events, venues, and attraction data from Ticketmaster’s global database",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://developer.ticketmaster.com/products-and-docs/apis/getting-started/",
            "category": "events"
        }
    ],

    'finance': [
        {
            "api": "Abstract VAT Validation",
            "desc": "Validate VAT numbers and calculate VAT rates for EU businesses",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.abstractapi.com/vat-validation-rates-api",
            "category": "finance"
        },
        {
            "api": "Aletheia",
            "desc": "Access insider trading data, earnings call analysis, and financial statements",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://aletheiaapi.com/",
            "category": "finance"
        },
        {
            "api": "Alpaca",
            "desc": "Realtime and historical market data on US equities and ETFs",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://alpaca.markets/docs/api-documentation/api-v2/market-data/alpaca-data-api-v2/",
            "category": "finance"
        },
        {
            "api": "Alpha Vantage",
            "desc": "Realtime and historical stock and forex market data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.alphavantage.co/",
            "category": "finance"
        },
        {
            "api": "apilayer marketstack",
            "desc": "Real-time, intraday, and historical stock market data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://marketstack.com/",
            "category": "finance"
        },
        {
            "api": "Banco do Brasil",
            "desc": "Access financial data and transactions for Banco do Brasil accounts",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developers.bb.com.br/home",
            "category": "finance"
        },
        {
            "api": "Billplz",
            "desc": "Online payment platform for billing and invoice management",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.billplz.com/api",
            "category": "finance"
        },
        {
            "api": "Binlist",
            "desc": "Lookup for IIN/BIN data to identify card issuer information",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://binlist.net/",
            "category": "finance"
        },
        {
            "api": "Boleto.Cloud",
            "desc": "Generate Boletos for payments in Brazil programmatically",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://boleto.cloud/",
            "category": "finance"
        },
        {
            "api": "Citi",
            "desc": "Access Citigroup banking data, accounts, and transactions",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://sandbox.developerhub.citi.com/api-catalog-list",
            "category": "finance"
        },
        {
            "api": "Econdb",
            "desc": "Access global macroeconomic and market data via a simple REST API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.econdb.com/api/",
            "category": "finance"
        },
        {
            "api": "Fed Treasury",
            "desc": "US Department of the Treasury fiscal and financial data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://fiscaldata.treasury.gov/api-documentation/",
            "category": "finance"
        },
        {
            "api": "Finage",
            "desc": "Realtime and historical data for stocks, crypto, indices, and ETFs",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://finage.co.uk/",
            "category": "finance"
        },
        {
            "api": "Financial Modeling Prep",
            "desc": "Realtime and historical stock data and financial statements",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://site.financialmodelingprep.com/developer/docs",
            "category": "finance"
        },
        {
            "api": "Finnhub",
            "desc": "Realtime APIs and WebSocket for stocks, forex, and cryptocurrencies",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://finnhub.io/docs/api",
            "category": "finance"
        },
        {
            "api": "FRED",
            "desc": "Economic data from the Federal Reserve Bank of St. Louis",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://fred.stlouisfed.org/docs/api/fred/",
            "category": "finance"
        },
        {
            "api": "Front Accounting APIs",
            "desc": "Multilingual and multicurrency accounting API for small businesses",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://frontaccounting.com/fawiki/index.php?n=Devel.SimpleAPIModule",
            "category": "finance"
        },
        {
            "api": "Hotstoks",
            "desc": "Stock market data powered by SQL for custom analytics",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://hotstoks.com?utm_source=public-apis",
            "category": "finance"
        },
        {
            "api": "IEX Cloud",
            "desc": "Realtime and historical US stock and market data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://iexcloud.io/docs/api/",
            "category": "finance"
        },
        {
            "api": "IG",
            "desc": "Access spread betting and CFD market data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://labs.ig.com/gettingstarted",
            "category": "finance"
        },
        {
            "api": "Indian Mutual Fund",
            "desc": "Get complete history and NAV of Indian mutual funds",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.mfapi.in/",
            "category": "finance"
        },
        {
            "api": "Intrinio",
            "desc": "Access a wide range of financial data feeds and analytics",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://intrinio.com/",
            "category": "finance"
        },
        {
            "api": "Klarna",
            "desc": "Payments and financing solutions for e-commerce integration",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.klarna.com/klarna-payments/api/payments-api/",
            "category": "finance"
        },
        {
            "api": "MercadoPago",
            "desc": "Integrate with Mercado Pago for online payments in Latin America",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.mercadopago.com.br/developers/es/reference",
            "category": "finance"
        },
        {
            "api": "Mono",
            "desc": "Connect with users’ bank accounts and access transaction data in Africa",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://mono.co/",
            "category": "finance"
        },
        {
            "api": "Moov",
            "desc": "Simplify money movement: send, receive, and store funds via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.moov.io/api/",
            "category": "finance"
        },
        {
            "api": "Nordigen",
            "desc": "Access bank account and transaction data using PSD2-compliant APIs",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://nordigen.com/en/account_information_documenation/integration/quickstart_guide/",
            "category": "finance"
        },
        {
            "api": "OpenFIGI",
            "desc": "Retrieve equity, index, futures, and options symbology from Bloomberg",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.openfigi.com/api",
            "category": "finance"
        },
        {
            "api": "Plaid",
            "desc": "Connect with users’ bank accounts and access financial transactions securely",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://plaid.com/",
            "category": "finance"
        },
        {
            "api": "Polygon",
            "desc": "Comprehensive stock, forex, and crypto market data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://polygon.io/",
            "category": "finance"
        },
        {
            "api": "Portfolio Optimizer",
            "desc": "Analyze and optimize investment portfolios with risk metrics",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://portfoliooptimizer.io/",
            "category": "finance"
        },
        {
            "api": "Razorpay IFSC",
            "desc": "Retrieve IFSC (Indian Financial System Code) and bank branch data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://razorpay.com/docs/",
            "category": "finance"
        },
        {
            "api": "Real Time Finance",
            "desc": "Access realtime stock data via WebSocket API",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "https://github.com/Real-time-finance/finance-websocket-API/",
            "category": "finance"
        },
        {
            "api": "SEC EDGAR Data",
            "desc": "Access annual and quarterly reports from public US companies",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.sec.gov/edgar/sec-api-documentation",
            "category": "finance"
        },
        {
            "api": "SmartAPI",
            "desc": "Create end-to-end brokerage services and trading apps",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://smartapi.angelbroking.com/",
            "category": "finance"
        },
        {
            "api": "StockData",
            "desc": "Realtime, intraday, and historical market data, news, and sentiment analysis",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.stockdata.org",
            "category": "finance"
        },
        {
            "api": "Styvio",
            "desc": "Realtime and historical stock data with sentiment insights",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.styvio.com",
            "category": "finance"
        },
        {
            "api": "Tradier",
            "desc": "US equity and options market data via REST and WebSocket APIs",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developer.tradier.com",
            "category": "finance"
        },
        {
            "api": "Twelve Data",
            "desc": "Realtime and historical stock, forex, and crypto market data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://twelvedata.com/",
            "category": "finance"
        },
        {
            "api": "WallstreetBets",
            "desc": "Sentiment analysis of WallstreetBets Reddit stock discussions",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://dashboard.nbshare.io/apps/reddit/api/",
            "category": "finance"
        },
        {
            "api": "Yahoo Finance",
            "desc": "Realtime and historical stock, forex, and crypto market data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.yahoofinanceapi.com/",
            "category": "finance"
        },
        {
            "api": "YNAB",
            "desc": "Budgeting and personal finance management API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.youneedabudget.com/",
            "category": "finance"
        },
        {
            "api": "Zoho Books",
            "desc": "Online accounting software for businesses with API integration",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.zoho.com/books/api/v3/",
            "category": "finance"
        }
    ],
    'food-drink': [
        {
            "api": "BaconMockup",
            "desc": "Generate resizable bacon placeholder images for web projects",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://baconmockup.com/",
            "category": "food-drink"
        },
        {
            "api": "Chomp",
            "desc": "Access detailed data about grocery products, ingredients, and nutrition",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://chompthis.com/api/",
            "category": "food-drink"
        },
        {
            "api": "Coffee",
            "desc": "Get random pictures of coffee cups and beans",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://coffee.alexflipnote.dev/",
            "category": "food-drink"
        },
        {
            "api": "Edamam Nutrition",
            "desc": "Analyze nutritional content and health labels of recipes or ingredients",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.edamam.com/edamam-docs-nutrition-api",
            "category": "food-drink"
        },
        {
            "api": "Edamam Recipes",
            "desc": "Search and filter recipes by ingredients, diet, and cuisine",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.edamam.com/edamam-docs-recipe-api",
            "category": "food-drink"
        },
        {
            "api": "Foodish",
            "desc": "Get random pictures of delicious food dishes",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/surhud004/Foodish#readme",
            "category": "food-drink"
        },
        {
            "api": "Fruityvice",
            "desc": "Retrieve nutritional and botanical data about fruits",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.fruityvice.com",
            "category": "food-drink"
        },
        {
            "api": "Kroger",
            "desc": "Access product, store, and category data from Kroger supermarkets",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.kroger.com/reference",
            "category": "food-drink"
        },
        {
            "api": "LCBO",
            "desc": "Get product and inventory data from the Liquor Control Board of Ontario",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://lcboapi.com/",
            "category": "food-drink"
        },
        {
            "api": "Open Brewery DB",
            "desc": "Find breweries, cideries, and craft beer bottle shops in the US",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.openbrewerydb.org",
            "category": "food-drink"
        },
        {
            "api": "Open Food Facts",
            "desc": "Access global database of food products, ingredients, and labels",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://world.openfoodfacts.org/data",
            "category": "food-drink"
        },
        {
            "api": "PunkAPI",
            "desc": "Access BrewDog’s catalog of craft beer recipes and details",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://punkapi.com/",
            "category": "food-drink"
        },
        {
            "api": "Rustybeer",
            "desc": "Beer brewing calculators and tools for homebrewers",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://rustybeer.herokuapp.com/",
            "category": "food-drink"
        },
        {
            "api": "Spoonacular",
            "desc": "Comprehensive API for recipes, food products, and meal planning",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://spoonacular.com/food-api",
            "category": "food-drink"
        },
        {
            "api": "Systembolaget",
            "desc": "Access product and store data from Sweden’s state liquor stores",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api-portal.systembolaget.se",
            "category": "food-drink"
        },
        {
            "api": "TacoFancy",
            "desc": "Community-driven database of taco recipes and variations",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://github.com/evz/tacofancy-api",
            "category": "food-drink"
        },
        {
            "api": "Tasty",
            "desc": "Access recipes, meal plans, and ingredient data from Tasty",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://rapidapi.com/apidojo/api/tasty/",
            "category": "food-drink"
        },
        {
            "api": "The Report of the Week",
            "desc": "Access data from TheReportOfTheWeek’s food and drink reviews",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/andyklimczak/TheReportOfTheWeek-API",
            "category": "food-drink"
        },
        {
            "api": "TheCocktailDB",
            "desc": "Search cocktail recipes, ingredients, and images",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.thecocktaildb.com/api.php",
            "category": "food-drink"
        },
        {
            "api": "TheMealDB",
            "desc": "Browse meal recipes, ingredients, and categories",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.themealdb.com/api.php",
            "category": "food-drink"
        },
        {
            "api": "Untappd",
            "desc": "Social platform API for discovering and reviewing beers",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://untappd.com/api/docs",
            "category": "food-drink"
        },
        {
            "api": "What's on the menu?",
            "desc": "NYPL’s human-transcribed historical menu collection API",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "http://nypl.github.io/menus-api/",
            "category": "food-drink"
        },
        {
            "api": "WhiskyHunter",
            "desc": "Access past online whisky auctions and pricing statistics",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://whiskyhunter.net/api/",
            "category": "food-drink"
        },
        {
            "api": "Zestful",
            "desc": "Parse and extract structured ingredient data from recipe text",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://zestfuldata.com/",
            "category": "food-drink"
        }
    ],

    'games-comics': [
        {
            "api": "Age of Empires II",
            "desc": "Retrieve data about civilizations, units, and structures from Age of Empires II",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://age-of-empires-2-api.herokuapp.com",
            "category": "games-comics"
        },
        {
            "api": "AmiiboAPI",
            "desc": "Get detailed information about Nintendo Amiibo figures",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://amiiboapi.com/",
            "category": "games-comics"
        },
        {
            "api": "Animal Crossing: New Horizons",
            "desc": "Retrieve data for critters, art, music, furniture, and villagers",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://acnhapi.com/",
            "category": "games-comics"
        },
        {
            "api": "Autochess VNG",
            "desc": "REST API for Autochess VNG game information and stats",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/didadadida93/autochess-vng-api",
            "category": "games-comics"
        },
        {
            "api": "Barter.VG",
            "desc": "Get data about games, DLCs, bundles, giveaways, and trades",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/bartervg/barter.vg/wiki",
            "category": "games-comics"
        },
        {
            "api": "Battle.net",
            "desc": "Access game data for Diablo, Hearthstone, StarCraft, and World of Warcraft",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://develop.battle.net/documentation/guides/getting-started",
            "category": "games-comics"
        },
        {
            "api": "Board Game Geek",
            "desc": "Retrieve data about board games, RPGs, and video games",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://boardgamegeek.com/wiki/page/BGG_XML_API2",
            "category": "games-comics"
        },
        {
            "api": "Brawl Stars",
            "desc": "Access player and game information for Brawl Stars",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.brawlstars.com",
            "category": "games-comics"
        },
        {
            "api": "Bugsnax",
            "desc": "Retrieve information about Bugsnax characters and species",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.bugsnaxapi.com/",
            "category": "games-comics"
        },
        {
            "api": "CheapShark",
            "desc": "Get real-time deals and price comparisons for PC games",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.cheapshark.com/api",
            "category": "games-comics"
        },
        {
            "api": "Chess.com",
            "desc": "Access public data from Chess.com profiles, games, and leaderboards",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.chess.com/news/view/published-data-api",
            "category": "games-comics"
        },
        {
            "api": "Clash of Clans",
            "desc": "Access player, clan, and war data for Clash of Clans",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.clashofclans.com",
            "category": "games-comics"
        },
        {
            "api": "Clash Royale",
            "desc": "Retrieve player and clan data for Clash Royale",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.clashroyale.com",
            "category": "games-comics"
        },
        {
            "api": "Comic Vine",
            "desc": "Comics, characters, and publisher information from Comic Vine",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://comicvine.gamespot.com/api/documentation",
            "category": "games-comics"
        },
        {
            "api": "Crafatar",
            "desc": "Get Minecraft avatar faces, skins, and renders",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://crafatar.com",
            "category": "games-comics"
        },
        {
            "api": "Destiny The Game",
            "desc": "Access Bungie’s Destiny 2 player, activity, and item data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bungie-net.github.io/multi/index.html",
            "category": "games-comics"
        },
        {
            "api": "Digimon Information",
            "desc": "Get details about Digimon creatures and attributes",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://digimon-api.vercel.app/",
            "category": "games-comics"
        },
        {
            "api": "Disney",
            "desc": "Access data on Disney characters and films",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://disneyapi.dev",
            "category": "games-comics"
        },
        {
            "api": "Dota 2",
            "desc": "Get player stats, matches, and hero data for Dota 2",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.opendota.com/",
            "category": "games-comics"
        },
        {
            "api": "Dungeons and Dragons",
            "desc": "Access 5e D&D spells, monsters, classes, and equipment data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.dnd5eapi.co/docs/",
            "category": "games-comics"
        },
        {
            "api": "Eve Online",
            "desc": "Access EVE Online player, corporation, and universe data",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://esi.evetech.net/ui",
            "category": "games-comics"
        },
        {
            "api": "Final Fantasy XIV",
            "desc": "Retrieve data from Final Fantasy XIV including items, quests, and characters",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://xivapi.com/",
            "category": "games-comics"
        },
        {
            "api": "Fortnite",
            "desc": "Access Fortnite player stats and leaderboards",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://fortnitetracker.com/site-api",
            "category": "games-comics"
        },
        {
            "api": "FreeToGame",
            "desc": "Free-to-play games database with categories and platforms",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.freetogame.com/api-doc",
            "category": "games-comics"
        },
        {
            "api": "GamerPower",
            "desc": "Track and discover active game giveaways and offers",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.gamerpower.com/api-read",
            "category": "games-comics"
        },
        {
            "api": "Genshin Impact",
            "desc": "Get game data for Genshin Impact including characters and weapons",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://genshin.dev",
            "category": "games-comics"
        },
        {
            "api": "Guild Wars 2",
            "desc": "Guild Wars 2 official API for player and game data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://wiki.guildwars2.com/wiki/API:Main",
            "category": "games-comics"
        },
        {
            "api": "Halo",
            "desc": "Access Halo 5 and Halo Wars 2 stats and game data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.haloapi.com/",
            "category": "games-comics"
        },
        {
            "api": "Hearthstone",
            "desc": "Access Hearthstone card data and game info",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://hearthstoneapi.com/",
            "category": "games-comics"
        },
        {
            "api": "IGDB.com",
            "desc": "Video game database including games, companies, and platforms",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api-docs.igdb.com",
            "category": "games-comics"
        },
        {
            "api": "JokeAPI",
            "desc": "Retrieve random jokes by category — programming, general, or dark humor",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://sv443.net/jokeapi/v2/",
            "category": "games-comics"
        },
        {
            "api": "Marvel",
            "desc": "Access Marvel Comics data — characters, stories, and events",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.marvel.com",
            "category": "games-comics"
        },
        {
            "api": "PokéAPI",
            "desc": "Access comprehensive Pokémon data — species, moves, and abilities",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pokeapi.co",
            "category": "games-comics"
        },
        {
            "api": "Rick and Morty",
            "desc": "Retrieve data on characters, episodes, and locations from Rick and Morty",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://rickandmortyapi.com",
            "category": "games-comics"
        },
        {
            "api": "Scryfall",
            "desc": "Access Magic: The Gathering cards, sets, and pricing data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://scryfall.com/docs/api",
            "category": "games-comics"
        },
        {
            "api": "SuperHeroes",
            "desc": "Access data on superheroes and villains across universes",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://superheroapi.com",
            "category": "games-comics"
        },
        {
            "api": "xkcd",
            "desc": "Retrieve XKCD comics as JSON data",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://xkcd.com/json.html",
            "category": "games-comics"
        },
        {
            "api": "Yu-Gi-Oh!",
            "desc": "Access Yu-Gi-Oh! TCG card and set information",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://db.ygoprodeck.com/api-guide/",
            "category": "games-comics"
        }
    ],

    'geocoding': [
        {
            "api": "Abstract IP Geolocation",
            "desc": "Locate website visitors by IP address and retrieve detailed geolocation data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.abstractapi.com/ip-geolocation-api",
            "category": "geocoding"
        },
        {
            "api": "Actinia Grass GIS",
            "desc": "Open source REST API for geospatial data processing using GRASS GIS",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://actinia.mundialis.de/api_docs/",
            "category": "geocoding"
        },
        {
            "api": "administrative-divisons-db",
            "desc": "Retrieve all administrative divisions of a specific country",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/kamikazechaser/administrative-divisions-db",
            "category": "geocoding"
        },
        {
            "api": "adresse.data.gouv.fr",
            "desc": "France address database with forward and reverse geocoding support",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://adresse.data.gouv.fr",
            "category": "geocoding"
        },
        {
            "api": "Apiip",
            "desc": "Retrieve location and network information from an IP address",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://apiip.net/",
            "category": "geocoding"
        },
        {
            "api": "apilayer ipstack",
            "desc": "Geolocation and IP lookup API to locate and identify visitors",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://ipstack.com/",
            "category": "geocoding"
        },
        {
            "api": "BigDataCloud",
            "desc": "High-precision IP geolocation with security insights and confidence area",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.bigdatacloud.com/ip-geolocation-apis",
            "category": "geocoding"
        },
        {
            "api": "Bing Maps",
            "desc": "Create and customize maps using Bing Maps data and services",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.microsoft.com/maps/",
            "category": "geocoding"
        },
        {
            "api": "Cartes.io",
            "desc": "Create custom maps with markers for collaborative projects",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/M-Media-Group/Cartes.io/wiki/API",
            "category": "geocoding"
        },
        {
            "api": "CountryStateCity",
            "desc": "Comprehensive dataset of world countries, states, and cities with coordinates",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://countrystatecity.in/",
            "category": "geocoding"
        },
        {
            "api": "FreeGeoIP",
            "desc": "Simple IP geolocation API with free tier and no authentication required",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://freegeoip.app/",
            "category": "geocoding"
        },
        {
            "api": "Geoapify",
            "desc": "Forward/reverse geocoding, address autocomplete, and routing services",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.geoapify.com/api/geocoding-api/",
            "category": "geocoding"
        },
        {
            "api": "Geocod.io",
            "desc": "Batch address geocoding and reverse lookup with US focus",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.geocod.io/",
            "category": "geocoding"
        },
        {
            "api": "Geocode.xyz",
            "desc": "Worldwide forward/reverse geocoding, batch geocoding, and geoparsing",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://geocode.xyz/api",
            "category": "geocoding"
        },
        {
            "api": "Geocodify.com",
            "desc": "Global address autocomplete, geocoding, and geoparsing API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://geocodify.com/",
            "category": "geocoding"
        },
        {
            "api": "GeoDB Cities",
            "desc": "Access global city, region, and country data with population and timezone info",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://geodb-cities-api.wirefreethought.com/",
            "category": "geocoding"
        },
        {
            "api": "GeoJS",
            "desc": "Simple IP geolocation service with JSON response and ChatOps integration",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.geojs.io/",
            "category": "geocoding"
        },
        {
            "api": "GeoNames",
            "desc": "Global place names database with over 11 million locations",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.geonames.org/export/web-services.html",
            "category": "geocoding"
        },
        {
            "api": "Google Maps",
            "desc": "Google Maps API for geolocation, routes, and map customization",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/maps/",
            "category": "geocoding"
        },
        {
            "api": "HERE Maps",
            "desc": "Geolocation, mapping, routing, and traffic APIs from HERE",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.here.com",
            "category": "geocoding"
        },
        {
            "api": "IP2Location",
            "desc": "Detailed IP geolocation with over 55 parameters per query",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.ip2location.com/web-service/ip2location",
            "category": "geocoding"
        },
        {
            "api": "ipapi.co",
            "desc": "Free IP address lookup and location detection API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://ipapi.co/api/#introduction",
            "category": "geocoding"
        },
        {
            "api": "ipapi.com",
            "desc": "Real-time IP geolocation and reverse IP lookup API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://ipapi.com/",
            "category": "geocoding"
        },
        {
            "api": "ipgeolocation.io",
            "desc": "Accurate IP geolocation API with timezone and currency info",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://ipgeolocation.io/",
            "category": "geocoding"
        },
        {
            "api": "LocationIQ",
            "desc": "Fast and scalable forward/reverse geocoding API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://locationiq.org/docs/",
            "category": "geocoding"
        },
        {
            "api": "Mapbox",
            "desc": "Create interactive maps and perform geocoding or routing",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.mapbox.com/",
            "category": "geocoding"
        },
        {
            "api": "Nominatim",
            "desc": "Open-source forward and reverse geocoding API using OpenStreetMap data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://nominatim.org/release-docs/latest/api/Overview/",
            "category": "geocoding"
        },
        {
            "api": "OpenCage",
            "desc": "Forward and reverse geocoding API using open datasets like OSM and Wikidata",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://opencagedata.com",
            "category": "geocoding"
        },
        {
            "api": "OpenStreetMap",
            "desc": "Access global map and location data with community-driven contributions",
            "auth": "OAuth",
            "https": "No",
            "cors": "Unknown",
            "href": "http://wiki.openstreetmap.org/wiki/API",
            "category": "geocoding"
        },
        {
            "api": "positionstack",
            "desc": "Forward and reverse geocoding with batch support",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://positionstack.com/",
            "category": "geocoding"
        },
        {
            "api": "Postcodes.io",
            "desc": "UK postcode lookup and geolocation API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://postcodes.io",
            "category": "geocoding"
        },
        {
            "api": "REST Countries",
            "desc": "Get detailed information about countries, borders, and regions",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://restcountries.com",
            "category": "geocoding"
        },
        {
            "api": "TomTom",
            "desc": "Access maps, routes, traffic, and location APIs from TomTom",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developer.tomtom.com/",
            "category": "geocoding"
        },
        {
            "api": "What3Words",
            "desc": "Convert GPS coordinates to unique 3-word identifiers worldwide",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://what3words.com",
            "category": "geocoding"
        },
        {
            "api": "Zippopotam.us",
            "desc": "Get city, state, and country data from postal codes worldwide",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.zippopotam.us",
            "category": "geocoding"
        }
    ],

    'government': [
        {
            "api": "Bank Negara Malaysia Open Data",
            "desc": "Malaysia Central Bank open financial data and statistics",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://apikijangportal.bnm.gov.my/",
            "category": "government"
        },
        {
            "api": "BCLaws",
            "desc": "Access to the laws and regulations of British Columbia, Canada",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://www.bclaws.gov.bc.ca/civix/template/complete/api/index.html",
            "category": "government"
        },
        {
            "api": "Brazil",
            "desc": "Community-driven API for public data in Brazil",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://brasilapi.com.br/",
            "category": "government"
        },
        {
            "api": "Brazil Central Bank Open Data",
            "desc": "Open data from the Central Bank of Brazil",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://dadosabertos.bcb.gov.br/",
            "category": "government"
        },
        {
            "api": "Brazil Receita WS",
            "desc": "Search and retrieve company information by CNPJ in Brazil",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.receitaws.com.br/",
            "category": "government"
        },
        {
            "api": "Brazilian Chamber of Deputies Open Data",
            "desc": "Legislative and voting information in XML and JSON formats",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://dadosabertos.camara.leg.br/swagger/api.html",
            "category": "government"
        },
        {
            "api": "Census.gov",
            "desc": "US Census Bureau APIs for demographics, housing, and business data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.census.gov/data/developers/data-sets.html",
            "category": "government"
        },
        {
            "api": "City of Berlin Open Data",
            "desc": "Open datasets provided by the city of Berlin (Germany)",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://daten.berlin.de/",
            "category": "government"
        },
        {
            "api": "City of Helsinki",
            "desc": "Open data from the city of Helsinki (Finland)",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://hri.fi/en_gb/",
            "category": "government"
        },
        {
            "api": "City of New York Open Data",
            "desc": "Access over 1,600 NYC datasets through a public API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://opendata.cityofnewyork.us/",
            "category": "government"
        },
        {
            "api": "City of Toronto Open Data",
            "desc": "Toronto city open data catalog including transit, health, and demographics",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://open.toronto.ca/",
            "category": "government"
        },
        {
            "api": "Code.gov",
            "desc": "US federal open-source software and code-sharing platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://code.gov",
            "category": "government"
        },
        {
            "api": "Data.gov",
            "desc": "US federal government open data platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.data.gov/",
            "category": "government"
        },
        {
            "api": "Data.parliament.uk",
            "desc": "UK Parliament open data, including bills, MPs, and petitions",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://explore.data.parliament.uk/?learnmore=Members",
            "category": "government"
        },
        {
            "api": "Deutscher Bundestag DIP",
            "desc": "German Bundestag API for accessing documents, sessions, and activities",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://dip.bundestag.de/documents/informationsblatt_zur_dip_api_v01.pdf",
            "category": "government"
        },
        {
            "api": "EPA",
            "desc": "Environmental datasets from the US Environmental Protection Agency",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.epa.gov/developers/data-data-products#apis",
            "category": "government"
        },
        {
            "api": "FBI Wanted",
            "desc": "Search and retrieve data from the FBI Wanted database",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.fbi.gov/wanted/api",
            "category": "government"
        },
        {
            "api": "Federal Register",
            "desc": "The official journal of the US federal government",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.federalregister.gov/reader-aids/developer-resources/rest-api",
            "category": "government"
        },
        {
            "api": "Gun Policy",
            "desc": "International database on firearm injury prevention and laws",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.gunpolicy.org/api",
            "category": "government"
        },
        {
            "api": "Interpol Red Notices",
            "desc": "Access and search Interpol Red Notice listings worldwide",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://interpol.api.bund.dev/",
            "category": "government"
        },
        {
            "api": "National Park Service",
            "desc": "Access park data, events, and visitor information for US national parks",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.nps.gov/subjects/developer/",
            "category": "government"
        },
        {
            "api": "Open Government, France",
            "desc": "French national open data portal",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.data.gouv.fr/",
            "category": "government"
        },
        {
            "api": "Open Government, Germany",
            "desc": "Germany’s open data platform with national and local datasets",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.govdata.de/",
            "category": "government"
        },
        {
            "api": "Open Government, Italy",
            "desc": "Italian government’s open data catalog",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.dati.gov.it/",
            "category": "government"
        },
        {
            "api": "Open Government, UK",
            "desc": "United Kingdom open data platform",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.gov.uk/",
            "category": "government"
        },
        {
            "api": "Open Government, USA",
            "desc": "Central US open government data catalog",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.data.gov/",
            "category": "government"
        },
        {
            "api": "PRC Exam Schedule",
            "desc": "Unofficial Philippine Professional Regulation Commission exam schedule",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.whenisthenextboardexam.com/docs/",
            "category": "government"
        },
        {
            "api": "UK Companies House",
            "desc": "Company registration and data API from the UK government",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.company-information.service.gov.uk/",
            "category": "government"
        },
        {
            "api": "USAspending.gov",
            "desc": "US federal spending, contracts, and grant data API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.usaspending.gov/",
            "category": "government"
        }
    ],

    'health': [
        {
            "api": "CMS.gov",
            "desc": "Access open healthcare data from the US Centers for Medicare & Medicaid Services",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.cms.gov/provider-data/",
            "category": "health"
        },
        {
            "api": "Coronavirus",
            "desc": "Latest global COVID-19 case data and statistics",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pipedream.com/@pravin/http-api-for-latest-wuhan-coronavirus-data-2019-ncov-p_G6CLVM/readme",
            "category": "health"
        },
        {
            "api": "Coronavirus in the UK",
            "desc": "UK Government COVID-19 data including cases, tests, and deaths by region",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://coronavirus.data.gov.uk/details/developers-guide",
            "category": "health"
        },
        {
            "api": "Covid Tracking Project",
            "desc": "COVID-19 data for the United States from The Atlantic’s Covid Tracking Project",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://covidtracking.com/data/api/version-2",
            "category": "health"
        },
        {
            "api": "Covid-19",
            "desc": "Global COVID-19 statistics including confirmed, deaths, and recovered cases",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://covid19api.com/",
            "category": "health"
        },
        {
            "api": "Covid-19 (M Media Group)",
            "desc": "COVID-19 country-level cases, deaths, and recoveries API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/M-Media-Group/Covid-19-API",
            "category": "health"
        },
        {
            "api": "Covid-19 Datenhub",
            "desc": "COVID-19 maps, datasets, and visualizations from ArcGIS Hub",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://npgeo-corona-npgeo-de.hub.arcgis.com",
            "category": "health"
        },
        {
            "api": "Covid-19 Government Response",
            "desc": "Oxford Government Response Tracker for global pandemic policies",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://covidtracker.bsg.ox.ac.uk",
            "category": "health"
        },
        {
            "api": "Covid-19 India",
            "desc": "COVID-19 data by state and district in India, including vaccination info",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.covid19india.org/",
            "category": "health"
        },
        {
            "api": "Covid-19 JHU CSSE",
            "desc": "Open API based on Johns Hopkins University global COVID-19 dataset",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://nuttaphat.com/covid19-api/",
            "category": "health"
        },
        {
            "api": "Covid-19 Live Data",
            "desc": "Global COVID-19 data by country including daily summaries and totals",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/mathdroid/covid-19-api",
            "category": "health"
        },
        {
            "api": "Covid-19 Philippines",
            "desc": "Unofficial Philippines COVID-19 API using DOH public data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/Simperfy/Covid-19-API-Philippines-DOH",
            "category": "health"
        },
        {
            "api": "COVID-19 Tracker Canada",
            "desc": "Detailed statistics on COVID-19 cases across Canada",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.covid19tracker.ca/docs/1.0/overview",
            "category": "health"
        },
        {
            "api": "COVID-19 Tracker Sri Lanka",
            "desc": "COVID-19 data and statistics from Sri Lanka’s Health Promotion Bureau",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.hpb.health.gov.lk/en/api-documentation",
            "category": "health"
        },
        {
            "api": "COVID-ID",
            "desc": "COVID-19 statistics per Indonesian province from official data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://data.covid19.go.id/public/api/prov.json",
            "category": "health"
        },
        {
            "api": "Dataflow Kit COVID-19",
            "desc": "Live COVID-19 data and hourly updates for websites and dashboards",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://covid-19.dataflowkit.com",
            "category": "health"
        },
        {
            "api": "FoodData Central",
            "desc": "USDA’s comprehensive database of food nutrition and composition data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://fdc.nal.usda.gov/",
            "category": "health"
        },
        {
            "api": "Healthcare.gov",
            "desc": "Educational and marketplace data for US healthcare plans",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.healthcare.gov/developers/",
            "category": "health"
        },
        {
            "api": "Humanitarian Data Exchange (HDX)",
            "desc": "UN OCHA platform for sharing humanitarian crisis and health data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.humdata.org/",
            "category": "health"
        },
        {
            "api": "Infermedica",
            "desc": "AI-based health triage and symptom checker API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developer.infermedica.com/docs/",
            "category": "health"
        },
        {
            "api": "LAPIS",
            "desc": "Access SARS-CoV-2 genomic sequence data from public repositories",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://cov-spectrum.ethz.ch/public",
            "category": "health"
        },
        {
            "api": "Lexigram",
            "desc": "NLP API for extracting clinical concepts and medical ontology mapping",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.lexigram.io/",
            "category": "health"
        },
        {
            "api": "Makeup",
            "desc": "Get product and brand data for cosmetics and makeup items",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://makeup-api.herokuapp.com/",
            "category": "health"
        },
        {
            "api": "MyVaccination",
            "desc": "Malaysia national vaccination program and statistics data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://documenter.getpostman.com/view/16605343/Tzm8GG7u",
            "category": "health"
        },
        {
            "api": "NPPES",
            "desc": "US NPI registry of healthcare providers and organizations",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://npiregistry.cms.hhs.gov/registry/help-api",
            "category": "health"
        },
        {
            "api": "Nutritionix",
            "desc": "World’s largest verified nutrition database with 800k+ foods",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.nutritionix.com/",
            "category": "health"
        },
        {
            "api": "Open Data NHS Scotland",
            "desc": "Public Health Scotland medical data and reports",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.opendata.nhs.scot",
            "category": "health"
        },
        {
            "api": "Open Disease",
            "desc": "Unified API for COVID-19 and influenza data worldwide",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://disease.sh/",
            "category": "health"
        },
        {
            "api": "openFDA",
            "desc": "FDA open data on drugs, devices, food, and enforcement reports",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://open.fda.gov",
            "category": "health"
        },
        {
            "api": "Orion Health",
            "desc": "Healthcare integration and data sharing platform for medical apps",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.orionhealth.io/",
            "category": "health"
        },
        {
            "api": "Quarantine",
            "desc": "Free real-time COVID-19 live update API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://quarantine.country/coronavirus/api/",
            "category": "health"
        }
    ],

    'jobs': [
        {
            "api": "Adzuna",
            "desc": "Job board and employment market data aggregator",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.adzuna.com/overview",
            "category": "jobs"
        },
        {
            "api": "Arbeitnow",
            "desc": "European job listings and remote work API aggregator",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://documenter.getpostman.com/view/18545278/UVJbJdKh",
            "category": "jobs"
        },
        {
            "api": "Arbeitsamt",
            "desc": "German public job search API for the official job agency",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://jobsuche.api.bund.dev/",
            "category": "jobs"
        },
        {
            "api": "Careerjet",
            "desc": "International job search engine API",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "https://www.careerjet.com/partners/api/",
            "category": "jobs"
        },
        {
            "api": "DevITjobs UK",
            "desc": "Developer-focused job feed API with GraphQL support",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://devitjobs.uk/job_feed.xml",
            "category": "jobs"
        },
        {
            "api": "Findwork",
            "desc": "Simple API for developers to search job listings across multiple sources",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://findwork.dev/developers/",
            "category": "jobs"
        },
        {
            "api": "GraphQL Jobs",
            "desc": "Job listings and company data served via GraphQL",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://graphql.jobs/docs/api/",
            "category": "jobs"
        },
        {
            "api": "Jobs2Careers",
            "desc": "Job aggregator and advertising platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://api.jobs2careers.com/api/spec.pdf",
            "category": "jobs"
        },
        {
            "api": "Jooble",
            "desc": "Job search engine API for multiple countries",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://jooble.org/api/about",
            "category": "jobs"
        },
        {
            "api": "Juju",
            "desc": "Job search engine and aggregator API",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.juju.com/publisher/spec/",
            "category": "jobs"
        },
        {
            "api": "Open Skills",
            "desc": "Open dataset for job titles, skills, and career relationships",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://github.com/workforce-data-initiative/skills-api/wiki/API-Overview",
            "category": "jobs"
        },
        {
            "api": "Reed",
            "desc": "Job board API with extensive UK listings",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.reed.co.uk/developers",
            "category": "jobs"
        },
        {
            "api": "The Muse",
            "desc": "Job board API with company profiles and career advice",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.themuse.com/developers/api/v2",
            "category": "jobs"
        },
        {
            "api": "Upwork",
            "desc": "Freelance job platform API for managing gigs, contracts, and users",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.upwork.com/",
            "category": "jobs"
        },
        {
            "api": "USAJOBS",
            "desc": "US Government’s official employment data API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.usajobs.gov/",
            "category": "jobs"
        },
        {
            "api": "WhatJobs",
            "desc": "Worldwide job search engine and aggregator",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.whatjobs.com/affiliates",
            "category": "jobs"
        },
        {
            "api": "ZipRecruiter",
            "desc": "Job search and recruiting platform API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.ziprecruiter.com/publishers",
            "category": "jobs"
        }
    ],

    'open-data': [
        {
            "api": "18F",
            "desc": "Unofficial US Federal Government API development resources and examples",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://18f.github.io/API-All-the-X/",
            "category": "open-data"
        },
        {
            "api": "API Setu",
            "desc": "Indian Government API platform offering KYC, business, education and employment data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.apisetu.gov.in/",
            "category": "open-data"
        },
        {
            "api": "Archive.org",
            "desc": "Access millions of free books, movies, software, music, and more from the Internet Archive",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://archive.readme.io/docs",
            "category": "open-data"
        },
        {
            "api": "Black History Facts",
            "desc": "Search or contribute to one of the largest Black history fact databases online",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.blackhistoryapi.io/docs",
            "category": "open-data"
        },
        {
            "api": "BotsArchive",
            "desc": "JSON formatted data about Telegram Bots indexed in the BotsArchive database",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://botsarchive.com/docs.html",
            "category": "open-data"
        },
        {
            "api": "Callook.info",
            "desc": "Access US amateur radio callsign lookup data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://callook.info",
            "category": "open-data"
        },
        {
            "api": "CARTO",
            "desc": "Location intelligence and spatial data analysis API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://carto.com/",
            "category": "open-data"
        },
        {
            "api": "CollegeScoreCard.ed.gov",
            "desc": "US Department of Education open data about higher education institutions",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://collegescorecard.ed.gov/data/",
            "category": "open-data"
        },
        {
            "api": "Enigma Public",
            "desc": "Access one of the broadest collections of public datasets across domains",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://developers.enigma.com/docs",
            "category": "open-data"
        },
        {
            "api": "French Address Search",
            "desc": "Search for French addresses using the official government geocoding API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://geo.api.gouv.fr/adresse",
            "category": "open-data"
        },
        {
            "api": "GENESIS",
            "desc": "German Federal Statistical Office open data API for statistical datasets",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.destatis.de/EN/Service/OpenData/api-webservice.html",
            "category": "open-data"
        },
        {
            "api": "Joshua Project",
            "desc": "Open data on people groups and languages worldwide",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.joshuaproject.net/",
            "category": "open-data"
        },
        {
            "api": "Kaggle",
            "desc": "Access datasets, notebooks, and competition metadata from Kaggle",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.kaggle.com/docs/api",
            "category": "open-data"
        },
        {
            "api": "LinkPreview",
            "desc": "Fetch preview metadata (title, description, image) for any URL",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.linkpreview.net",
            "category": "open-data"
        },
        {
            "api": "Lowy Asia Power Index",
            "desc": "Ranking and data for countries' power and influence in Asia",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/0x0is1/lowy-index-api-docs",
            "category": "open-data"
        },
        {
            "api": "Microlink.io",
            "desc": "Extract structured data, metadata, and screenshots from any website",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://microlink.io",
            "category": "open-data"
        },
        {
            "api": "Nasdaq Data Link",
            "desc": "Official stock market and economic data API from Nasdaq",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.data.nasdaq.com/",
            "category": "open-data"
        },
        {
            "api": "Nobel Prize",
            "desc": "Open data API about Nobel laureates, prizes, and related events",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.nobelprize.org/about/developer-zone-2/",
            "category": "open-data"
        },
        {
            "api": "Open Data Minneapolis",
            "desc": "City of Minneapolis GIS and statistical datasets",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://opendata.minneapolismn.gov/",
            "category": "open-data"
        },
        {
            "api": "openAFRICA",
            "desc": "Largest open data repository for African countries and institutions",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://africaopendata.org/",
            "category": "open-data"
        },
        {
            "api": "OpenCorporates",
            "desc": "Open database of corporate entities and directors globally",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://api.opencorporates.com/documentation/API-Reference",
            "category": "open-data"
        },
        {
            "api": "OpenSanctions",
            "desc": "Data on international sanctions, crime, and politically exposed persons",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.opensanctions.org/docs/api/",
            "category": "open-data"
        },
        {
            "api": "PeakMetrics",
            "desc": "News articles and open public datasets with sentiment and trend analysis",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://rapidapi.com/peakmetrics-peakmetrics-default/api/peakmetrics-news",
            "category": "open-data"
        },
        {
            "api": "Recreation Information Database",
            "desc": "US Government open data about recreational areas, historic sites, and museums",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://ridb.recreation.gov/",
            "category": "open-data"
        },
        {
            "api": "Scoop.it",
            "desc": "Content curation and discovery service API",
            "auth": "apiKey",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.scoop.it/dev",
            "category": "open-data"
        },
        {
            "api": "Socrata",
            "desc": "Global access to open data from governments, NGOs, and organizations",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://dev.socrata.com/",
            "category": "open-data"
        },
        {
            "api": "Teleport",
            "desc": "Open API for quality of life and urban data from around the world",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.teleport.org/",
            "category": "open-data"
        },
        {
            "api": "Umeå Open Data",
            "desc": "Public data portal for the city of Umeå, Sweden",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://opendata.umea.se/api/",
            "category": "open-data"
        },
        {
            "api": "Universities List",
            "desc": "Open dataset of universities with names, domains, and countries",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/Hipo/university-domains-list",
            "category": "open-data"
        },
        {
            "api": "University of Oslo",
            "desc": "University of Oslo API with courses, videos, and academic data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.uio.no/",
            "category": "open-data"
        },
        {
            "api": "UPC database",
            "desc": "API containing over 1.5 million barcode entries from around the world",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://upcdatabase.org/api",
            "category": "open-data"
        },
        {
            "api": "Urban Observatory",
            "desc": "Real-time urban data and sensor information from UK cities",
            "auth": "No",
            "https": "No",
            "cors": "No",
            "href": "https://urbanobservatory.ac.uk",
            "category": "open-data"
        },
        {
            "api": "Wikidata",
            "desc": "Structured open knowledge base maintained by the Wikimedia Foundation",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.wikidata.org/w/api.php?action=help",
            "category": "open-data"
        },
        {
            "api": "Wikipedia",
            "desc": "MediaWiki API for Wikipedia content and metadata access",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.mediawiki.org/wiki/API:Main_page",
            "category": "open-data"
        },
        {
            "api": "Yelp",
            "desc": "API for finding and reviewing local businesses",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.yelp.com/developers/documentation/v3",
            "category": "open-data"
        }
    ],

    'open-source': [
        {
            "api": "Countly",
            "desc": "Open source web and mobile analytics platform with real-time tracking and event monitoring",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://api.count.ly/reference",
            "category": "open-source"
        },
        {
            "api": "Creative Commons Catalog",
            "desc": "Search and explore openly licensed and public domain works using Creative Commons API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.creativecommons.engineering/",
            "category": "open-source"
        },
        {
            "api": "Datamuse",
            "desc": "Word-finding and related terms query engine for developers",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.datamuse.com/api/",
            "category": "open-source"
        },
        {
            "api": "Drupal.org",
            "desc": "Access Drupal.org public data and project information",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.drupal.org/drupalorg/docs/api",
            "category": "open-source"
        },
        {
            "api": "Evil Insult Generator",
            "desc": "Generate humorous and 'evil' insults through a free API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://evilinsult.com/api",
            "category": "open-source"
        },
        {
            "api": "GitHub Contribution Chart Generator",
            "desc": "Generate an image visualization of your GitHub contributions calendar",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github-contribution-graph.ez4o.com/",
            "category": "open-source"
        },
        {
            "api": "GitHub ReadMe Stats",
            "desc": "Dynamically generate GitHub profile statistics cards for your README",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/anuraghazra/github-readme-stats",
            "category": "open-source"
        },
        {
            "api": "Metabase",
            "desc": "Open source business intelligence and analytics platform for data visualization and sharing",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.metabase.com/docs/latest/api-documentation.html",
            "category": "open-source"
        },
        {
            "api": "Shields",
            "desc": "Generate clean and consistent badges (SVG/PNG) for open source projects",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://shields.io/",
            "category": "open-source"
        }
    ],

    'patents': [
        {
            "api": "EPO",
            "desc": "European Patent Office API providing access to European patent search and publication data",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.epo.org/",
            "category": "patents"
        },
        {
            "api": "PatentsView",
            "desc": "API designed to explore and visualize trends across the US innovation and patent landscape",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://patentsview.org/apis/purpose",
            "category": "patents"
        },
        {
            "api": "TIPO",
            "desc": "Taiwan Intellectual Property Office patent data and search API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://tiponet.tipo.gov.tw/Gazette/OpenData/OD/OD05.aspx?QryDS=API00",
            "category": "patents"
        },
        {
            "api": "USPTO",
            "desc": "United States Patent and Trademark Office open data and search services",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.uspto.gov/learning-and-resources/open-data-and-mobility",
            "category": "patents"
        }
    ],

    'personality': [
        {
            "api": "Advice Slip",
            "desc": "Generate random pieces of life advice through a simple public API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://api.adviceslip.com/",
            "category": "personality"
        },
        {
            "api": "Biriyani As A Service",
            "desc": "Get random biryani images as placeholders for fun projects",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://biriyani.anoram.com/",
            "category": "personality"
        },
        {
            "api": "Dev.to",
            "desc": "Access articles, users, and other resources from the Forem/Dev.to platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.forem.com/api",
            "category": "personality"
        },
        {
            "api": "Dictum",
            "desc": "Get access to a collection of humanity's most inspiring quotes and expressions",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/fisenkodv/dictum",
            "category": "personality"
        },
        {
            "api": "FavQs",
            "desc": "Collect, discover and share your favorite quotes easily via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://favqs.com/api",
            "category": "personality"
        },
        {
            "api": "FOAAS",
            "desc": "Humorous API providing sarcastic responses and insults as a service",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.foaas.com/",
            "category": "personality"
        },
        {
            "api": "Forismatic",
            "desc": "Inspirational quotes API for motivation and reflection",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://forismatic.com/en/api/",
            "category": "personality"
        },
        {
            "api": "icanhazdadjoke",
            "desc": "Get random dad jokes — the largest collection on the internet",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://icanhazdadjoke.com/api",
            "category": "personality"
        },
        {
            "api": "Inspiration",
            "desc": "Motivational and inspirational quotes API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://inspiration.goprogram.ai/docs/",
            "category": "personality"
        },
        {
            "api": "kanye.rest",
            "desc": "Get random Kanye West quotes via a free REST API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://kanye.rest",
            "category": "personality"
        },
        {
            "api": "kimiquotes",
            "desc": "Team radio and interview quotes by Finnish F1 legend Kimi Räikkönen",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://kimiquotes.herokuapp.com/doc",
            "category": "personality"
        },
        {
            "api": "Medium",
            "desc": "Access Medium’s public articles, users and topics data",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/Medium/medium-api-docs",
            "category": "personality"
        },
        {
            "api": "Programming Quotes",
            "desc": "Inspirational and funny programming-related quotes API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/skolakoda/programming-quotes-api",
            "category": "personality"
        },
        {
            "api": "Quotable",
            "desc": "Free and open source quotations API with thousands of famous quotes",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/lukePeavey/quotable",
            "category": "personality"
        },
        {
            "api": "Quote Garden",
            "desc": "Over 5000 famous and inspirational quotes available via REST API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pprathameshmore.github.io/QuoteGarden/",
            "category": "personality"
        },
        {
            "api": "quoteclear",
            "desc": "API providing an ever-growing list of James Clear quotes from the 3-2-1 Newsletter",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://quoteclear.web.app/",
            "category": "personality"
        },
        {
            "api": "Quotes on Design",
            "desc": "Inspirational and design-focused quotes for creatives",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://quotesondesign.com/api/",
            "category": "personality"
        },
        {
            "api": "Stoicism Quote",
            "desc": "Daily quotes and teachings inspired by Stoic philosophy",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/tlcheah2/stoic-quote-lambda-public-api",
            "category": "personality"
        },
        {
            "api": "They Said So Quotes",
            "desc": "Extensive quotes database trusted by major brands and apps",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://theysaidso.com/api/",
            "category": "personality"
        },
        {
            "api": "Traitify",
            "desc": "API for personality assessment, data collection and analysis",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://app.traitify.com/developer",
            "category": "personality"
        },
        {
            "api": "Udemy (Instructor)",
            "desc": "API for Udemy instructors to access and manage course data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.udemy.com/developers/instructor/",
            "category": "personality"
        },
        {
            "api": "Vadivelu HTTP Codes",
            "desc": "On-demand HTTP status codes presented with Vadivelu memes",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://vadivelu.anoram.com/",
            "category": "personality"
        },
        {
            "api": "Zen Quotes",
            "desc": "Extensive collection of Zen and mindfulness quotes for inspiration",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://zenquotes.io/",
            "category": "personality"
        }
    ],

    'phone': [
        {
            "api": "Abstract Phone Validation",
            "desc": "Global phone number validation API for verifying format, type, and carrier information",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.abstractapi.com/phone-validation-api",
            "category": "phone"
        },
        {
            "api": "apilayer numverify",
            "desc": "International phone number validation and carrier lookup API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://numverify.com",
            "category": "phone"
        },
        {
            "api": "Cloudmersive Validate",
            "desc": "API for validating and formatting international phone numbers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://cloudmersive.com/phone-number-validation-API",
            "category": "phone"
        },
        {
            "api": "Phone Specification",
            "desc": "Public REST API providing detailed phone specifications and model data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/azharimm/phone-specs-api",
            "category": "phone"
        },
        {
            "api": "Veriphone",
            "desc": "Real-time phone number validation, carrier lookup, and country detection API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://veriphone.io",
            "category": "phone"
        }
    ],

    'photography': [
        {
            "api": "apilayer Screenshotlayer",
            "desc": "Convert any website URL into an image with a simple API call",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://screenshotlayer.com",
            "category": "photography"
        },
        {
            "api": "APITemplate.io",
            "desc": "Dynamically generate images and PDFs from custom templates via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://apitemplate.io",
            "category": "photography"
        },
        {
            "api": "Bruzu",
            "desc": "Generate custom images dynamically using query parameters",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.bruzu.com",
            "category": "photography"
        },
        {
            "api": "CheetahO",
            "desc": "Optimize and resize photos for web performance",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://cheetaho.com/docs/getting-started/",
            "category": "photography"
        },
        {
            "api": "Dagpi",
            "desc": "Image manipulation and creative visual processing API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://dagpi.xyz",
            "category": "photography"
        },
        {
            "api": "Duply",
            "desc": "Generate, edit, and manage images and videos through API automation",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://duply.co/docs#getting-started-api",
            "category": "photography"
        },
        {
            "api": "DynaPictures",
            "desc": "Create personalized and branded images automatically at scale",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://dynapictures.com/docs/",
            "category": "photography"
        },
        {
            "api": "Flickr",
            "desc": "Access photos and metadata from Flickr’s massive photography library",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.flickr.com/services/api/",
            "category": "photography"
        },
        {
            "api": "Getty Images",
            "desc": "Search and retrieve premium stock photography and editorial images",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "http://developers.gettyimages.com/en/",
            "category": "photography"
        },
        {
            "api": "Gfycat",
            "desc": "Upload, search, and retrieve GIFs and short video clips",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.gfycat.com/api/",
            "category": "photography"
        },
        {
            "api": "Giphy",
            "desc": "Search, upload, and share GIFs and stickers from the Giphy library",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.giphy.com/docs/",
            "category": "photography"
        },
        {
            "api": "Google Photos",
            "desc": "Integrate Google Photos content and media management into apps",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developers.google.com/photos",
            "category": "photography"
        },
        {
            "api": "Imgur",
            "desc": "Upload, share, and search images on Imgur",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://apidocs.imgur.com/",
            "category": "photography"
        },
        {
            "api": "Imsea",
            "desc": "Free image search API for simple visual queries",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://imsea.herokuapp.com/",
            "category": "photography"
        },
        {
            "api": "Lorem Picsum",
            "desc": "Randomized placeholder images sourced from Unsplash",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://picsum.photos/",
            "category": "photography"
        },
        {
            "api": "ObjectCut",
            "desc": "Remove backgrounds from images automatically via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://objectcut.com/",
            "category": "photography"
        },
        {
            "api": "Pexels",
            "desc": "Free stock photos and videos from creators around the world",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.pexels.com/api/",
            "category": "photography"
        },
        {
            "api": "PhotoRoom",
            "desc": "Remove image backgrounds with AI precision",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.photoroom.com/api/",
            "category": "photography"
        },
        {
            "api": "Pixabay",
            "desc": "Access millions of free stock photos, illustrations, and videos",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pixabay.com/sk/service/about/api/",
            "category": "photography"
        },
        {
            "api": "PlaceKeanu",
            "desc": "Generate placeholder images featuring Keanu Reeves (grayscale & young Keanu options)",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://placekeanu.com/",
            "category": "photography"
        },
        {
            "api": "Readme Typing SVG",
            "desc": "Customizable animated typing SVG generator for README files",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/DenverCoder1/readme-typing-svg",
            "category": "photography"
        },
        {
            "api": "Remove.bg",
            "desc": "AI-powered background removal API for photos",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.remove.bg/api",
            "category": "photography"
        },
        {
            "api": "ReSmush.it",
            "desc": "Free image optimization and compression API",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "https://resmush.it/api",
            "category": "photography"
        },
        {
            "api": "Shutterstock",
            "desc": "Search and license stock photos, videos, and music",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api-reference.shutterstock.com/",
            "category": "photography"
        },
        {
            "api": "Sirv",
            "desc": "Image optimization, manipulation, and hosting API for the web",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://apidocs.sirv.com/",
            "category": "photography"
        },
        {
            "api": "Unsplash",
            "desc": "Access millions of free, high-quality photos via API",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://unsplash.com/developers",
            "category": "photography"
        },
        {
            "api": "Wallhaven",
            "desc": "Access high-resolution wallpapers via Wallhaven API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://wallhaven.cc/help/api",
            "category": "photography"
        },
        {
            "api": "Webdam",
            "desc": "Digital asset management API for image libraries and metadata",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.damsuccess.com/hc/en-us/articles/202134055-REST-API",
            "category": "photography"
        }
    ],

    'programming': [
        {
            "api": "Codeforces",
            "desc": "Access Codeforces data including contests, user stats, and problem sets via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://codeforces.com/apiHelp",
            "category": "programming"
        },
        {
            "api": "Hackerearth",
            "desc": "Compile and execute code in multiple programming languages using HackerEarth API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.hackerearth.com/docs/wiki/developers/v4/",
            "category": "programming"
        },
        {
            "api": "Judge0 CE",
            "desc": "Open-source online code execution API supporting multiple languages",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://ce.judge0.com/",
            "category": "programming"
        },
        {
            "api": "KONTESTS",
            "desc": "Get data on upcoming and ongoing competitive programming contests",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://kontests.net/api",
            "category": "programming"
        },
        {
            "api": "Mintlify",
            "desc": "Generate clean, interactive documentation for your code programmatically",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.mintlify.com",
            "category": "programming"
        }
    ],

    'science-math': [
        {
            "api": "arcsecond.io",
            "desc": "Access multiple astronomy data sources and celestial catalogs",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.arcsecond.io/",
            "category": "science-math"
        },
        {
            "api": "arXiv",
            "desc": "Open access repository for research papers in physics, math, and related disciplines",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://arxiv.org/help/api/user-manual",
            "category": "science-math"
        },
        {
            "api": "CORE",
            "desc": "Global access to open access research papers and academic publications",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://core.ac.uk/services#api",
            "category": "science-math"
        },
        {
            "api": "GBIF",
            "desc": "Global Biodiversity Information Facility API providing species occurrence data",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.gbif.org/developer/summary",
            "category": "science-math"
        },
        {
            "api": "iDigBio",
            "desc": "Access millions of natural history specimen records from museums worldwide",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/idigbio/idigbio-search-api/wiki",
            "category": "science-math"
        },
        {
            "api": "inspirehep.net",
            "desc": "Information system for high energy physics literature and research data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/inspirehep/rest-api-doc",
            "category": "science-math"
        },
        {
            "api": "isEven (humor)",
            "desc": "Fun API to check if a number is even",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://isevenapi.xyz/",
            "category": "science-math"
        },
        {
            "api": "ISRO",
            "desc": "Retrieve public information about Indian Space Research Organization missions",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://isro.vercel.app",
            "category": "science-math"
        },
        {
            "api": "ITIS",
            "desc": "Integrated Taxonomic Information System for species classification data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.itis.gov/ws_description.html",
            "category": "science-math"
        },
        {
            "api": "Launch Library 2",
            "desc": "Database of spaceflight launches, agencies, and events",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://thespacedevs.com/llapi",
            "category": "science-math"
        },
        {
            "api": "Materials Platform for Data Science",
            "desc": "Curated experimental data and materials properties database",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://mpds.io",
            "category": "science-math"
        },
        {
            "api": "Minor Planet Center",
            "desc": "Astronomical data about asteroids and other small Solar System bodies",
            "auth": "No",
            "https": "No",
            "cors": "Unknown",
            "href": "http://www.asterank.com/mpc",
            "category": "science-math"
        },
        {
            "api": "NASA",
            "desc": "Access NASA’s public data including imagery, astronomy, and satellite data",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://api.nasa.gov",
            "category": "science-math"
        },
        {
            "api": "NASA ADS",
            "desc": "NASA Astrophysics Data System for scientific publications and research data",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://ui.adsabs.harvard.edu/help/api/api-docs.html",
            "category": "science-math"
        },
        {
            "api": "Newton",
            "desc": "Perform symbolic and arithmetic mathematical calculations via API",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://newton.vercel.app",
            "category": "science-math"
        },
        {
            "api": "Noctua",
            "desc": "Access astronomical data and star catalogues via NoctuaSky API",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.noctuasky.com/api/v1/swaggerdoc/",
            "category": "science-math"
        },
        {
            "api": "Numbers (Math.tools)",
            "desc": "Retrieve facts, properties, and trivia about numbers",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://math.tools/api/numbers/",
            "category": "science-math"
        },
        {
            "api": "Numbers API",
            "desc": "Simple API providing random or specific facts about numbers",
            "auth": "No",
            "https": "No",
            "cors": "No",
            "href": "http://numbersapi.com",
            "category": "science-math"
        },
        {
            "api": "Ocean Facts",
            "desc": "Scientific facts and information related to oceanography",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://oceanfacts.herokuapp.com/",
            "category": "science-math"
        },
        {
            "api": "Open Notify",
            "desc": "Public data about ISS location, astronauts, and space activity",
            "auth": "No",
            "https": "No",
            "cors": "No",
            "href": "http://open-notify.org/Open-Notify-API/",
            "category": "science-math"
        },
        {
            "api": "Open Science Framework",
            "desc": "Repository for sharing and archiving open research projects and data",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.osf.io",
            "category": "science-math"
        },
        {
            "api": "Purple Air",
            "desc": "Real-time air quality monitoring data from sensors around the world",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www2.purpleair.com/",
            "category": "science-math"
        },
        {
            "api": "Remote Calc",
            "desc": "Solve remote math calculations using base64-encoded data input",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/elizabethadegbaju/remotecalc",
            "category": "science-math"
        },
        {
            "api": "SHARE",
            "desc": "Free open dataset about global research and scholarly activity",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://share.osf.io/api/v2/",
            "category": "science-math"
        },
        {
            "api": "SpaceX (REST)",
            "desc": "Public REST API providing data on SpaceX launches, rockets, and missions",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://github.com/r-spacex/SpaceX-API",
            "category": "science-math"
        },
        {
            "api": "SpaceX (GraphQL)",
            "desc": "GraphQL API for querying SpaceX data on launches and vehicles",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.spacex.land/graphql/",
            "category": "science-math"
        },
        {
            "api": "Sunrise and Sunset",
            "desc": "Calculate sunrise and sunset times for any geographic coordinates",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://sunrise-sunset.org/api",
            "category": "science-math"
        },
        {
            "api": "Times Adder",
            "desc": "Add multiple time values and return the cumulative result as JSON",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://github.com/FranP-code/API-Times-Adder",
            "category": "science-math"
        },
        {
            "api": "TLE",
            "desc": "Retrieve Two-Line Element (TLE) satellite orbit data",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://tle.ivanstanojevic.me/#/docs",
            "category": "science-math"
        },
        {
            "api": "USGS Earthquake Hazards Program",
            "desc": "Real-time earthquake data and seismic event information",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://earthquake.usgs.gov/fdsnws/event/1/",
            "category": "science-math"
        },
        {
            "api": "USGS Water Services",
            "desc": "Retrieve data on water quality and levels for rivers and lakes",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://waterservices.usgs.gov/",
            "category": "science-math"
        },
        {
            "api": "World Bank",
            "desc": "Access global economic, demographic, and development data",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589",
            "category": "science-math"
        },
        {
            "api": "xMath",
            "desc": "Generate and solve random mathematical expressions",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://x-math.herokuapp.com/",
            "category": "science-math"
        }
    ],

    'security': [
        {
            "api": "Application Environment Verification",
            "desc": "Verify Android device integrity and detect rooted or unsafe environments",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/fingerprintjs/aev",
            "category": "security"
        },
        {
            "api": "BinaryEdge",
            "desc": "Access BinaryEdge’s global scanning platform for threat intelligence data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://docs.binaryedge.io/api-v2.html",
            "category": "security"
        },
        {
            "api": "BitWarden",
            "desc": "Open-source password manager API for secure credential management",
            "auth": "OAuth",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://bitwarden.com/help/api/",
            "category": "security"
        },
        {
            "api": "Botd",
            "desc": "Browser-based JavaScript bot detection library and API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/fingerprintjs/botd",
            "category": "security"
        },
        {
            "api": "Bugcrowd",
            "desc": "Manage and track bug bounty reports programmatically",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.bugcrowd.com/api/getting-started/",
            "category": "security"
        },
        {
            "api": "Censys",
            "desc": "Search and analyze Internet-connected hosts and devices",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://search.censys.io/api",
            "category": "security"
        },
        {
            "api": "Classify",
            "desc": "Encrypt and decrypt text messages via API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://classify-web.herokuapp.com/#/api",
            "category": "security"
        },
        {
            "api": "Complete Criminal Checks",
            "desc": "Retrieve offender data across all U.S. states and Puerto Rico",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://completecriminalchecks.com/Developers",
            "category": "security"
        },
        {
            "api": "CRXcavator",
            "desc": "Assess and score Chrome extensions for security risks",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://crxcavator.io/apidocs",
            "category": "security"
        },
        {
            "api": "Dehash.lt",
            "desc": "Decrypt hashes including MD5, SHA1, SHA256, and SHA512",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/Dehash-lt/api",
            "category": "security"
        },
        {
            "api": "EmailRep",
            "desc": "Analyze email addresses for threat level and reputation scoring",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.emailrep.io/",
            "category": "security"
        },
        {
            "api": "Escape",
            "desc": "Escape text for safe use in different query formats",
            "auth": "No",
            "https": "Yes",
            "cors": "No",
            "href": "https://github.com/polarspetroll/EscapeAPI",
            "category": "security"
        },
        {
            "api": "FilterLists",
            "desc": "Comprehensive directory of filter lists for ad blockers and firewalls",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://filterlists.com",
            "category": "security"
        },
        {
            "api": "FingerprintJS Pro",
            "desc": "Advanced browser fingerprinting and fraud detection API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://dev.fingerprintjs.com/docs",
            "category": "security"
        },
        {
            "api": "FraudLabs Pro",
            "desc": "AI-based fraud detection and order verification API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://www.fraudlabspro.com/developer/api/screen-order",
            "category": "security"
        },
        {
            "api": "FullHunt",
            "desc": "Global database of exposed assets for attack surface management",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api-docs.fullhunt.io/#introduction",
            "category": "security"
        },
        {
            "api": "GitGuardian",
            "desc": "Scan code and repositories for exposed API keys and credentials",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "No",
            "href": "https://api.gitguardian.com/doc",
            "category": "security"
        },
        {
            "api": "GreyNoise",
            "desc": "Analyze IPs observed scanning the internet and filter benign traffic",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://docs.greynoise.io/reference/get_v3-community-ip",
            "category": "security"
        },
        {
            "api": "HackerOne",
            "desc": "Interact with HackerOne’s bug bounty platform via API",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://api.hackerone.com/",
            "category": "security"
        },
        {
            "api": "Hashable",
            "desc": "Perform cryptographic operations like hashing and encryption via REST API",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://hashable.space/pages/api/",
            "category": "security"
        },
        {
            "api": "Have I Been Pwned",
            "desc": "Check if your passwords or emails have appeared in data breaches",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://haveibeenpwned.com/API/v3",
            "category": "security"
        },
        {
            "api": "Intelligence X",
            "desc": "Perform OSINT searches through Intelligence X’s datasets",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/IntelligenceX/SDK/blob/master/Intelligence%20X%20API.pdf",
            "category": "security"
        },
        {
            "api": "LoginRadius",
            "desc": "Comprehensive managed user authentication and identity platform",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://www.loginradius.com/docs/",
            "category": "security"
        },
        {
            "api": "Microsoft Security Response Center (MSRC)",
            "desc": "Engage with Microsoft’s security vulnerability reporting APIs",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://msrc.microsoft.com/report/developer",
            "category": "security"
        },
        {
            "api": "Mozilla HTTP Scanner",
            "desc": "Scan and analyze web server configurations using Mozilla Observatory",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/mozilla/http-observatory/blob/master/httpobs/docs/api.md",
            "category": "security"
        },
        {
            "api": "Mozilla TLS Scanner",
            "desc": "Audit TLS configurations with Mozilla Observatory tools",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://github.com/mozilla/tls-observatory#api-endpoints",
            "category": "security"
        },
        {
            "api": "National Vulnerability Database (NVD)",
            "desc": "Access U.S. government vulnerability and CVE data feeds",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://nvd.nist.gov/vuln/Data-Feeds/JSON-feed-changelog",
            "category": "security"
        },
        {
            "api": "Passwordinator",
            "desc": "Generate strong random passwords of varying complexity",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://github.com/fawazsullia/password-generator/",
            "category": "security"
        },
        {
            "api": "PhishStats",
            "desc": "Database of known phishing sites and campaigns",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://phishstats.info/",
            "category": "security"
        },
        {
            "api": "Privacy.com",
            "desc": "Generate merchant-specific virtual payment cards securely",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://privacy.com/developer/docs",
            "category": "security"
        },
        {
            "api": "Pulsedive",
            "desc": "Collect and analyze real-time threat intelligence data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://pulsedive.com/api/",
            "category": "security"
        },
        {
            "api": "SecurityTrails",
            "desc": "Query domain, IP, WHOIS, and DNS records for security research",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://securitytrails.com/corp/apidocs",
            "category": "security"
        },
        {
            "api": "Shodan",
            "desc": "Search engine for discovering Internet-connected devices and vulnerabilities",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://developer.shodan.io/",
            "category": "security"
        },
        {
            "api": "Spyse",
            "desc": "Access detailed internet asset data for security and attack surface analysis",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://spyse-dev.readme.io/reference/quick-start",
            "category": "security"
        },
        {
            "api": "Threat Jammer",
            "desc": "Evaluate and score IPs and domains based on curated threat data",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://threatjammer.com/docs/index",
            "category": "security"
        },
        {
            "api": "UK Police",
            "desc": "Public data about crimes and policing in the United Kingdom",
            "auth": "No",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://data.police.uk/docs/",
            "category": "security"
        },
        {
            "api": "Virushee",
            "desc": "File and data scanning for malware and suspicious content",
            "auth": "No",
            "https": "Yes",
            "cors": "Yes",
            "href": "https://api.virushee.com/",
            "category": "security"
        },
        {
            "api": "VulDB",
            "desc": "Vulnerability intelligence API providing CVE data and risk context",
            "auth": "apiKey",
            "https": "Yes",
            "cors": "Unknown",
            "href": "https://vuldb.com/?doc.api",
            "category": "security"
        }
    ],
}

// ============================================================================

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get all APIs for a specific category
 */
export function getAPIsByCategory(category: APICategory): ExternalAPI[] {
    return externalAPIs[category] || []
}

/**
 * Get total count of all APIs
 */
export function getTotalAPIsCount(): number {
    return Object.values(externalAPIs).reduce((sum, arr) => sum + arr.length, 0)
}

/**
 * Search APIs by name or description
 */
export function searchAPIs(query: string): ExternalAPI[] {
    const lowerQuery = query.toLowerCase()
    const results: ExternalAPI[] = []

    Object.values(externalAPIs).forEach((categoryAPIs) => {
        categoryAPIs.forEach((api) => {
            if (api.api.toLowerCase().includes(lowerQuery) || api.desc.toLowerCase().includes(lowerQuery)) {
                results.push(api)
            }
        })
    })

    return results
}
