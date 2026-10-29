import "server-only";

export const site = {
  title: "The Pawprint Trail",
  description:
    "A private, gentle path through artificial intelligence for someone starting from nothing.",
  /** Learner name on the letter. Configured via LEARNER_NAME or falls back to "AI explorer". */
  learnerName: process.env.LEARNER_NAME?.trim() || "AI explorer",
  friendNote:
    process.env.FRIEND_NOTE?.trim() ||
    "Congratulations on reaching the end of the trail! You took every step, learned the concepts, and proved how capable you are.",
  /** Nameless sign-off. Do not put a real person's name here. */
  friendSign: process.env.FRIEND_SIGN?.trim() || "Your friend",
  finaleFun:
    "The bear is doing a victory hop. He saved this quiet den for the day you finished.",
  finaleNext:
    "You are in a better position now to go through the next ideas by yourself. Take them one at a time. You already know how to learn.",
};

export function learnerLabel() {
  const name = site.learnerName.trim();
  return name || "AI explorer";
}
