import { partyMembers } from "./party";
import { newPartyMembers } from "./newParty";

export const campaigns = [
  {
    id: "mirror-lands",
    name: "The Mirror Lands",
    blurb: "Welcome to the crazy world of Guys & Dolls. This was a fun project to make!",
    partyHeading: "The Party",
    soundtrackIntro: "Playlists made by the players themselves. What would the characters listen to?",
    showWorld: true,
    showRecordings: true,
    world: {
      title: "The Mirror Lands",
      description:
        "A hand-drawn map of the realms—Riftwood, Snake Skin Cove, and beyond. Click to view full-size.",
      image: "/map.jpg",
      points: [
        "Regions, coves, mountains, and islands",
        "Used for session recaps and world pages",
        "Optimized for desktop and mobile viewing",
      ],
    },
    members: partyMembers,
  },
  {
    id: "campaign-2",
    name: "Campaign 2",
    blurb: "Same players, a new party.",
    partyHeading: "The Party",
    soundtrackIntro: "Playlists for this party. Add a Spotify link on each character to show it here.",
    showWorld: false,
    showRecordings: false,
    world: null,
    members: newPartyMembers,
  },
];
