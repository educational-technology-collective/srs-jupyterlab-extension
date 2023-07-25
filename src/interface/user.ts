export interface user {
  user_id: number;
  email: string;
  cards: Array<{
    fc_id: number;
    type: "q" | "m";
    reviewRecord: { // used for "m" only
				gotCorrect: number | null, // used for "m" only
				gotWrong: number | null, // used for "m" only
				passed: number | null, // used for "m" only
				know: number, // updated from mobile app
				forget: number, // updated from mobile app
				oneMore: number, // updated from mobile app
				noMore: number, // updated from mobile app
			},
			seenTime: "YYYYMMDD", // updated from mobile app
			nextReview: "YYYYMMDD", // filled by the SRS algorithm
			createdAt: "", // for this user (mongo)
			updatedAt: "" // for this user (mongo)
  }>;
}
