export type PartId = "start" | "how" | "push";

export type Source = {
  title: string;
  url: string;
  why: string;
  access: string;
};

export type Mcq = {
  prompt: string;
  choices: string[];
  answer: number;
};

export type Lesson = {
  slug: string;
  title: string;
  part: PartId;
  minutes: number;
  coding: boolean;
  fresh?: boolean;
  summary: string;
  paragraphs: string[];
  remember: string;
  watch: string;
  practice: string[];
  video: { id: string; title: string };
  quiz: { mcq: Mcq[]; open: string };
  source: Source;
  deeper?: Source;
};

export type DayPlan = {
  id: number;
  title: string;
  blurb: string;
  optional?: boolean;
  tag?: "harder" | "explain";
  slugs: string[];
};

export const parts: { id: PartId; title: string; kicker: string; blurb: string }[] = [
  { id: "start", title: "Start", kicker: "Days 1–6", blurb: "Use it without being fooled." },
  { id: "how", title: "How", kicker: "Days 7–10", blurb: "What it can see, and how a guess is made." },
  { id: "push", title: "Push", kicker: "Days 11–20", blurb: "Do the work, then explain it in plain words." },
];

const free = "Free.";

export const lessons: Lesson[] = [
  {
    slug: "what-is-ai",
    title: "What people mean by AI",
    part: "start",
    minutes: 30,
    coding: false,
    summary: "AI is software that learned from examples and now makes a guess.",
    paragraphs: [
      "You are starting from zero. Nothing earlier is assumed.",
      "AI is software that learned from examples and now makes a guess. A spam filter, a photo label, and a chatbot are the same kind of tool. There is no person in the machine.",
      "A guess can be useful. It is still a guess. It does not know your life, and it does not know when it is wrong.",
      "Tomorrow you will split this one idea into three words people mix up.",
    ],
    remember: "A guess is not the same as knowing.",
    watch: "Watch the whole video. It is about 12 minutes. Then do the practice.",
    practice: [
      "Pick one tool you used this week. A map, a photo app, an inbox, or a chat box all count.",
      "Write four lines in a note you can keep. What did you ask it to do? What did it hand back? Which part was a guess? What would you check before you trusted it?",
      "Read the four lines out loud. If they sound like a person living in the phone, rewrite them so they sound like software.",
      "Keep the note. Tomorrow you will give that software its right name.",
    ],
    video: { id: "a0_lo_GDcFw", title: "What Is Artificial Intelligence? Crash Course AI #1" },
    quiz: {
      mcq: [
        {
          prompt: "When a model answers, what is it doing?",
          choices: [
            "Retrieving a stored fact that was already checked",
            "Generating a likely answer from patterns it learned in examples",
            "Running a handwritten rule written for this exact question",
          ],
          answer: 1,
        },
        {
          prompt: "A label a model puts on a photo should be treated as…",
          choices: [
            "A prediction that can be wrong, even when it looks confident",
            "Proof a person reviewed that exact photo",
            "A guarantee, because training removes wrong labels",
          ],
          answer: 0,
        },
      ],
      open: "Pick one tool you use. Say what the model is guessing, and what you would check before you trusted that guess.",
    },
    source: { title: "Elements of AI", url: "https://www.elementsofai.com/", why: "The gentle first course.", access: free },
  },
  {
    slug: "three-ideas",
    title: "Three words, untangled",
    part: "start",
    minutes: 30,
    coding: false,
    summary: "AI is the big idea. Machine learning is the method. Deep learning is one powerful method.",
    paragraphs: [
      "Yesterday, AI meant software that guesses. Today the name splits into three.",
      "AI is the big idea: a machine doing a task that used to need a person. Machine learning is the method: the software learns from examples instead of a handwritten list of rules. Deep learning is one powerful kind of machine learning, built from many guesses stacked on each other.",
      "Headlines use the biggest word. When someone says AI, ask which of the three they mean. Most products you meet are machine learning with a friendly name.",
      "After a rest day, you will find these guesses in places that do not say AI on the button.",
    ],
    remember: "Most products you meet are machine learning with a friendly name.",
    watch: "Watch the whole video. It is about 5 minutes. The practice after it is the longer part of today.",
    practice: [
      "On paper, write the three words. Under each, write one sentence in your own words. AI. Machine learning. Deep learning.",
      "Take the tool from yesterday. Write which of the three fits it best, and why the other two are too big or too small.",
      "Pick a second tool, one that is not a chatbot. A map route or a spam filter works. Label it the same way.",
      "Say all three sentences out loud, in any order, without looking. Peek if you need to, then say them once more from memory.",
    ],
    video: { id: "2ePf9rue1Ao", title: "What is Artificial Intelligence? In 5 minutes." },
    quiz: {
      mcq: [
        {
          prompt: "Machine learning differs from a handwritten list of rules because the software…",
          choices: [
            "Is given one rule that already contains every correct answer",
            "Learns a pattern from examples instead of storing an answer for each case",
            "Becomes unable to be wrong once training finishes",
          ],
          answer: 1,
        },
        {
          prompt: "Where does deep learning sit among the three terms?",
          choices: [
            "It is a kind of machine learning that stacks many simple layers",
            "It replaces AI, so a deep learning model is no longer AI",
            "It is a longer list of if-then rules written by hand",
          ],
          answer: 0,
        },
      ],
      open: "In a few sentences, tell someone how AI, machine learning, and deep learning fit together, and which term fits a tool you use.",
    },
    source: { title: "AI for Everyone", url: "https://www.deeplearning.ai/courses/ai-for-everyone/", why: "Names, without the math.", access: "Free to start." },
  },
  {
    slug: "already-there",
    title: "Where you already meet it",
    part: "start",
    minutes: 30,
    coding: false,
    summary: "Maps, cameras, inboxes, and chat boxes already guess for you.",
    paragraphs: [
      "Yesterday you had three words. Today you put them on your own day.",
      "Maps guess a route. Cameras guess a face. Inboxes guess which mail is junk. A keyboard guesses the next word. The chat window is the new, visible part. The older tools were guessing before anyone put AI on the button.",
      "If a product finishes your sentence, it is guessing from examples, the way day 1 described. The label on the button does not change that.",
      "Tomorrow you will test one answer. A smooth sentence can still be made up.",
    ],
    remember: "If a product finishes your sentence, it is guessing.",
    watch: "The video is about 22 minutes. Watch the first 8 minutes, then stop. You only need the part that ties the three words to a chat tool. The rest can wait.",
    practice: [
      "List three guesses your phone or computer made today. One line each: the app, the guess, and whether you trusted it.",
      "Open one of those apps and find the guess again. Write what it got right. If you can see a miss, write that too.",
      "Mark each line older tool or chat tool. If none of them is a chatbot, that is the point. The quiet ones were already there.",
      "Pick the guess you would least like to be wrong. Write one check you could do before you follow it. You will practice that check tomorrow.",
    ],
    video: { id: "G2fqAlgmoPo", title: "Introduction to Generative AI" },
    quiz: {
      mcq: [
        {
          prompt: "A maps app that suggests a route is…",
          choices: [
            "A fixed timetable printed once and never updated from data",
            "A search that returns only routes a person already approved for you",
            "A model predicting a route from patterns, not a person watching the road",
          ],
          answer: 2,
        },
        {
          prompt: "Autocomplete and a chatbot are alike because both…",
          choices: [
            "Predict a likely next piece of text from examples",
            "Look up the one correct sentence in a dictionary",
            "Check each word against a source before showing it",
          ],
          answer: 0,
        },
      ],
      open: "Name one prediction your phone made this week. Say what the model was guessing, and what you would not trust it to decide.",
    },
    source: { title: "Google AI Essentials", url: "https://grow.google/ai-essentials/", why: "Everyday use, not theory.", access: "Free to start." },
  },
  {
    slug: "limits",
    title: "Fluent is not the same as true",
    part: "start",
    minutes: 30,
    coding: false,
    summary: "A smooth answer can still be invented.",
    paragraphs: [
      "Yesterday you found guesses you already live with. Today you learn the catch.",
      "A chatbot is built to continue the sentence, not to look the world up. Sure-sounding words are easy to generate. Confidence is part of the style.",
      "A surprising fact needs another source. Ask it to promise, and it can promise in the same smooth voice. The tone is not a check.",
      "After a rest day, you will ask for a real task, with limits, so the draft is something you can edit. Use a public fact today. Passwords and private notes stay out. Day 6 is about that rule.",
    ],
    remember: "Smooth does not mean checked.",
    watch: "The video is about 18 minutes. Watch the first 10. Stop when you can say why a smooth answer can still be invented.",
    practice: [
      "Open any free chat tool you can use. ChatGPT, Claude, and Gemini are the usual ones. Any one is fine. You will choose a favorite on day 13.",
      "Ask for one public fact you can check without it: a date, a number, or who made something. Save the answer in your note. Do not paste anything private.",
      "Check that fact in two places you trust. A book, an official page, or a person who was there. Do not ask the same chat to grade itself.",
      "Write three lines: what it said, what the other source said, and whether the tone was sure. If it was wrong and sure, that is the whole lesson.",
    ],
    video: { id: "2IK3DFHRFfw", title: "Generative AI in a Nutshell" },
    quiz: {
      mcq: [
        {
          prompt: "A hallucination is when the model…",
          choices: [
            "Looks a fact up and the source it found is out of date",
            "Writes fluent text that is not supported by a source, and may be invented",
            "Refuses to answer until you attach a document",
          ],
          answer: 1,
        },
        {
          prompt: "A surprising fact in a chat answer should be checked by…",
          choices: [
            "Asking the same model to promise the fact is true",
            "Trusting the confident tone, which means it verified the claim",
            "Looking it up in a source outside that chat",
          ],
          answer: 2,
        },
      ],
      open: "Name one kind of fact you would not trust from a model alone, and say which outside source you would use to check it.",
    },
    source: { title: "Elements of AI, on limits", url: "https://www.elementsofai.com/", why: "The chapter on what these systems cannot do.", access: free },
  },
  {
    slug: "prompts",
    title: "Ask for a real task",
    part: "start",
    minutes: 30,
    coding: false,
    summary: "Say who it is for, what you already know, and what done looks like.",
    paragraphs: [
      "Yesterday a smooth answer still needed a check. Today you ask in a shape you can edit.",
      "A vague question gets a vague draft. A task with limits gets something you can cut. Say who it is for, the facts you already know, and what done looks like.",
      "The video shows six pieces. You need three today: role, facts, and done. Then you edit. You do not ship the first draft.",
      "Tomorrow you will look at that ask and take out anything that must never be pasted.",
    ],
    remember: "Role, facts, and done. Then you edit.",
    watch: "Watch the whole video. It is about 8 minutes. It shows six pieces. Today you use three: who it is for, the facts you have, and what done looks like.",
    practice: [
      "Pick a real chore from this week. A message, a list, a short plan, or a summary. Keep private names out of it.",
      "Write a weak ask in one line, the kind that only says help me with this.",
      "Rewrite it in three lines. Line 1: who it is for. Line 2: the facts you already know. Line 3: what done looks like, including length.",
      "Paste only the three-line ask into the chat. Read the draft. Mark one sentence you would change. Do not send the draft to anyone. You will edit for real on day 12. Save both asks.",
    ],
    video: { id: "jC4v5AS4RIM", title: "Master the Perfect ChatGPT Prompt Formula (in just 8 minutes)!" },
    quiz: {
      mcq: [
        {
          prompt: "A prompt you can edit against includes…",
          choices: [
            "Only a polite word, leaving the task for the model to invent",
            "The task, the facts you already know, and what done looks like",
            "An order that the model is not allowed to be wrong",
          ],
          answer: 1,
        },
        {
          prompt: "The first draft the model returns is…",
          choices: [
            "Text you still edit, because the prompt did not verify the facts",
            "Finished work, because a specific prompt is the same as a check",
            "Something you should not judge, so the model's wording stays untouched",
          ],
          answer: 0,
        },
      ],
      open: "Write a prompt for a real chore: who it is for, the facts you already know, and what done looks like. Then say one change you would still make in the draft.",
    },
    source: { title: "AI Prompting for Everyone", url: "https://www.deeplearning.ai/courses/ai-prompting-for-everyone/", why: "Practice asking, not theory.", access: "Free to start." },
  },
  {
    slug: "careful",
    title: "What you must not paste",
    part: "start",
    minutes: 30,
    coding: false,
    summary: "Passwords, IDs, private messages, and other people's secrets stay out of the box.",
    paragraphs: [
      "Yesterday you put a real chore in the box. Today you decide what never goes in.",
      "A chat box is someone else's computer. If you would not email it to a stranger, do not paste it. Passwords, ID numbers, private messages, and other people's secrets stay out.",
      "Deleting the chat later does not take the words back. Saying please does not make a secret anonymous. The tool does not owe you secrecy.",
      "After a rest day, the question changes. Even a safe ask only works if the tool can see the thing you mean.",
    ],
    remember: "The tool does not owe you secrecy.",
    watch: "The video is a longer course. Watch the first 8 minutes. Stop once you have heard that people stay responsible for what the tool does.",
    practice: [
      "Write three things you will not paste. Next to each, write the harm if it leaked.",
      "Open the three-line ask from yesterday. Cross out any real name, address, password, or private detail. Replace it with a stand-in, such as a customer named Sam.",
      "If yesterday's ask was already clean, write a second ask that is tempting and wrong, then rewrite it so the secret stays out.",
      "Say this out loud: the tool does not owe me secrecy. Keep the cleaned ask. Day 11 turns it into a brief.",
    ],
    video: { id: "3-xhMXeYIcg", title: "Introduction to Responsible AI" },
    quiz: {
      mcq: [
        {
          prompt: "A password or someone else's private note stays out of the prompt because…",
          choices: [
            "The prompt stays on your machine, so a secret in it is not sent anywhere",
            "Those words are sent to someone else's system, and deleting the chat does not pull them back",
            "Writing 'keep this private' stops the provider from storing the prompt",
          ],
          answer: 1,
        },
        {
          prompt: "If a task needs a private detail, the careful move is to…",
          choices: [
            "Replace it with a stand-in so the real value never enters the prompt",
            "Paste it, then delete the chat so the only copy is gone",
            "Paste it in a follow-up, which is not part of the prompt",
          ],
          answer: 0,
        },
      ],
      open: "Name one kind of data you will not put in a prompt, and say what could go wrong if that text left your machine.",
    },
    source: { title: "Google AI Essentials", url: "https://grow.google/ai-essentials/", why: "The lessons on careful use.", access: "Free to start." },
  },
  {
    slug: "context",
    title: "What it can actually see",
    part: "how",
    minutes: 30,
    coding: false,
    summary: "It sees the words, files, and photos in this chat. It does not see your life.",
    paragraphs: [
      "Yesterday you kept secrets out. Today you learn the other limit: it only sees what is in front of it.",
      "It sees the words, files, and photos in this chat. It does not see your unread mail, your camera roll, or a file you meant to attach and forgot.",
      "If the file is not in the chat, it will still answer. That answer is a guess about a file it does not have. A connected app is the exception, and only for what that app is allowed to show.",
      "Tomorrow you will open a link. A footnote is not the page.",
    ],
    remember: "No attachment, no knowledge of that file.",
    watch: "Watch the first 10 minutes. You want the picture of what a model is given. If the video ends sooner, watch all of it.",
    practice: [
      "Pick a harmless page you can share: a recipe, a short public note, or instructions for a chore. Nothing private.",
      "Ask the chat to do a task about that page, and do not attach it. Save one sentence of the answer.",
      "Attach the file, or paste the text, and ask the same task again. Write what changed.",
      "Write one line you could tell a friend: it cannot see a file that never entered the chat. You will need that sentence on day 19.",
    ],
    video: { id: "zizonToFXDs", title: "Introduction to large language models" },
    quiz: {
      mcq: [
        {
          prompt: "A model's context for this reply is…",
          choices: [
            "Your private files from training, even when you never put them in this chat",
            "Your whole computer, because a newer model can see local files on its own",
            "The text, files, and tool results actually passed in for this turn",
          ],
          answer: 2,
        },
        {
          prompt: "If you ask about a file you forgot to attach, the model will…",
          choices: [
            "Still generate an answer, but that answer is not based on the file",
            "Read the file from your disk because the filename was in the prompt",
            "Wait, because it cannot generate until every mentioned file is in the context",
          ],
          answer: 0,
        },
      ],
      open: "For a real task, what would you put in the context? What would you not trust the model to know if you left it out?",
    },
    source: { title: "How large language models work", url: "https://www.youtube.com/watch?v=5sLYAQS9sWQ", why: "The picture of what the model is given.", access: free },
  },
  {
    slug: "check-the-link",
    title: "A link is not proof",
    part: "how",
    minutes: 30,
    coding: false,
    summary: "Search and citations help. They can still point at the wrong page.",
    paragraphs: [
      "Yesterday the tool only knew what you gave it. Today it may offer a link. A link is still not proof.",
      "If it looked something up, open the page. The sentence under the link can twist what the page said. A citation means it pointed at a page you can open. It does not mean the claim is true.",
      "If the page is unrelated, or it will not open, throw that claim out. Do not ask the tool to sound more sure.",
      "After a rest day, you will look under the answer. The machinery is a pattern, not magic.",
    ],
    remember: "Open the source. Do not stop at the footnote.",
    watch: "Watch up to 10 minutes, then come back and open a real page. If the video is shorter, watch all of it.",
    practice: [
      "Ask for a sourced answer to a small public question. Tell it to include a link. Keep secrets out, the same rule as day 6.",
      "Open one link. Read enough of the page to find the claim, not just the headline.",
      "Write three lines. What the chat said. What the page actually says. Whether you keep the claim, fix it, or throw it out.",
      "If the link is dead or about something else, write that down too. A broken link is an answer: do not trust that sentence.",
    ],
    video: { id: "5sLYAQS9sWQ", title: "How Large Language Models Work" },
    quiz: {
      mcq: [
        {
          prompt: "A citation under a claim means…",
          choices: [
            "The claim was verified, so opening the page is optional",
            "The model pointed at a page you can open and compare to the claim",
            "The page was generated with the claim, so they match by design",
          ],
          answer: 1,
        },
        {
          prompt: "If that page is unrelated or will not open, you should…",
          choices: [
            "Drop the claim, because the citation does not support it",
            "Keep the claim and ask the model to state it more confidently",
            "Treat the dead link as a formatting issue, not an evidence problem",
          ],
          answer: 0,
        },
      ],
      open: "Name one claim you would only keep after opening the page. Say what you would look for on that page before you trusted it.",
    },
    source: { title: "The Batch", url: "https://www.deeplearning.ai/the-batch/", why: "One calm weekly letter.", access: free },
  },
  {
    slug: "patterns",
    title: "Patterns, not magic",
    part: "how",
    minutes: 30,
    coding: false,
    summary: "A neural net is many small guesses stacked until a pattern appears.",
    paragraphs: [
      "You have been using a guess and checking it. Today you get one picture of how the guess is built.",
      "A neural net is many small guesses stacked until a pattern appears. Training means showing examples and adjusting a little when the guess is wrong. You do not need the formula.",
      "It learned a pattern from those examples. It did not learn the world. That is why day 4 can happen: the pattern sounds right and the fact is wrong.",
      "The picture is actually simple. Nobody is hiding a person inside it. Tomorrow you will see a chatbot use this pattern one word at a time.",
    ],
    remember: "It learned a pattern. It did not learn the world.",
    watch: "The video is about 19 minutes. Watch the first 10. You want the picture of many small guesses stacked. Stop before the formulas.",
    practice: [
      "After the first 10 minutes, pause. Draw three boxes in a stack. Label them examples in, pattern, guess out.",
      "Under the drawing, write the day 4 fact you checked. Where did it go wrong: the pattern was confident, or you never checked?",
      "Explain the drawing out loud in four sentences, as if to a friend who has not watched the video. No word you cannot explain.",
      "If you get stuck, peek at the video once, then close it and say the four sentences again. Day 19 uses this same out-loud habit.",
    ],
    video: { id: "aircAruvnKk", title: "But what is a neural network? | 3Blue1Brown" },
    quiz: {
      mcq: [
        {
          prompt: "Training a neural net means…",
          choices: [
            "Showing examples and adjusting the model when its guess is wrong",
            "Writing an if-then rule for every input a user might send",
            "Saving each example so a later question can look that exact answer up",
          ],
          answer: 0,
        },
        {
          prompt: "After training, what does the model have?",
          choices: [
            "A copy of the world, because enough examples close every gap",
            "A pattern from its training data, which can sound right when the fact is wrong",
            "A checked answer for any new question, stored beside the matching example",
          ],
          answer: 1,
        },
      ],
      open: "Explain what training data gives a model, and what that pattern does not prove about a new answer.",
    },
    source: { title: "3Blue1Brown neural network series", url: "https://www.3blue1brown.com/topics/neural-networks", why: "Pictures, not a textbook.", access: free },
  },
  {
    slug: "chatbot",
    title: "How a chatbot writes",
    part: "how",
    minutes: 30,
    coding: false,
    summary: "It picks a likely next piece of text, then does that again.",
    paragraphs: [
      "Yesterday's picture was a stack of guesses. A chatbot uses that stack one step at a time.",
      "It picks a likely next piece of text, then does that again. That is why two answers can wander. That is why a made-up detail can sound like the rest of the paragraph.",
      "You still check the result. Next word, next word, is not the same as a source.",
      "Day 10 means you can use one. You are not finished forever, and you do not need to train a model tonight. The next ten days ask you to work. After a rest day, you will write a brief a person could follow.",
    ],
    remember: "Next word, next word. You still check the result.",
    watch: "The video is about 27 minutes. Watch the first 8. You want one idea: it picks a likely next piece of text, then does that again. Stop before the math.",
    practice: [
      "Ask one clear question twice, in two fresh chats if you can. Use a public question. Save both answers.",
      "Underline one sentence that stayed the same and one detail that changed. A changed detail is the next-word habit, not a new fact about the world.",
      "Pick one detail that matters and check it the way you did on day 4 or day 8. Write whether you would keep it.",
      "Write the check you will use every time from here: what you asked, what you would verify, and what you would not trust. The harder half starts next.",
    ],
    video: { id: "wjZofJX0v4M", title: "Transformers, the tech behind LLMs | 3Blue1Brown" },
    quiz: {
      mcq: [
        {
          prompt: "A chatbot builds a reply by…",
          choices: [
            "Opening one stored essay that already answers this prompt",
            "Checking each new token against a source before showing it",
            "Choosing a likely next token, then repeating that for the rest of the text",
          ],
          answer: 2,
        },
        {
          prompt: "Why can the same prompt produce a different detail in a fresh chat?",
          choices: [
            "Each reply samples likely next tokens. Temperature only changes how varied that sample is. It is not a source check.",
            "The second chat is required to disagree with the first",
            "A changed detail means the later reply retrieved a source",
          ],
          answer: 0,
        },
      ],
      open: "Now that a reply is built token by token, what will you check every time? What would you not trust just because it fits the paragraph?",
    },
    source: { title: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", why: "Pictures of the same idea, if you want them.", access: free },
  },
  {
    slug: "brief",
    title: "Write a brief a coworker could follow",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "From here the task is real. Write a brief, not a wish.",
    paragraphs: [
      "The first ten days taught you how to use a chatbot without being fooled. Today the task is a piece of work.",
      "A brief is a job description for the draft. Include the reader, the job, the facts you already have, the length, and what you will reject. This is the skill people hire for.",
      "Day 11 is harder because you produce that brief. It is not harder because the video is longer. Please be smart is not a brief. The brand name of the tool is not a brief.",
      "Tomorrow you will edit whatever this brief produces. Your name would be on it.",
    ],
    remember: "A brief is a job description for the draft.",
    watch: "You watched this on day 5. Play it again only if the three lines feel fuzzy. Today the brief is the work.",
    practice: [
      "Choose a real chore a coworker could recognize. Use the cleaned ask from day 6 if it still fits. No secrets.",
      "Write the brief in five labeled lines: reader, task, facts you already have, length, and what you will reject.",
      "Hand that brief to the chat. Read the draft once. Do not polish it yet. Save the brief and the draft together.",
      "Check the draft against the brief. Circle one place it ignored the reader, the length, or your reject list. Day 12 is for the edit. A wish is not enough. You need the five lines.",
    ],
    video: { id: "jC4v5AS4RIM", title: "Master the Perfect ChatGPT Prompt Formula (in just 8 minutes)!" },
    quiz: {
      mcq: [
        {
          prompt: "A brief a teammate could follow has to specify…",
          choices: [
            "The reader, the task, the known facts, the length, and what to reject",
            "The product name of the model, and nothing about the job",
            "A request to be smart, so the model can choose the audience and the format",
          ],
          answer: 0,
        },
        {
          prompt: "A system prompt and a user prompt do different jobs. Which split is right?",
          choices: [
            "The system prompt is hidden memory of your files. The user prompt is optional.",
            "The system prompt holds standing rules, such as the role. The user prompt holds this task, the facts, and what done looks like.",
            "The user prompt is checked for truth. The system prompt is the part the model may ignore.",
          ],
          answer: 1,
        },
      ],
      open: "Write the brief you would hand someone: reader, task, known facts, and what you would reject in the draft.",
    },
    source: { title: "AI Prompting for Everyone", url: "https://www.deeplearning.ai/courses/ai-prompting-for-everyone/", why: "The practice is the point.", access: "Free to start." },
  },
  {
    slug: "editor",
    title: "You are the editor",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "A draft is not done until you have checked the names, the numbers, and the claim.",
    paragraphs: [
      "Yesterday you wrote a brief and got a draft. Today you are the editor.",
      "Read it as if your name will be on it. Shipping it untouched is how mistakes leave your hands. The editor cuts and checks. Clapping is not the job, and hiding the tool is not the job.",
      "Mark one sentence you would delete and one fact you would look up. A name or a number is the usual place a draft goes wrong.",
      "After a rest day, you will stay inside one tool long enough to see where it helps and where it invents.",
    ],
    remember: "Your name on it means you checked it.",
    watch: "You watched this on day 4. Play the first 8 minutes again only if you want the picture of a fluent mistake. Then edit a draft.",
    practice: [
      "Open the draft from day 11. If you do not have it, run your five-line brief once and use that draft.",
      "Cross out one sentence that does not earn its place. Look up one name or number in a source you trust. Fix the draft to match what you found.",
      "Read the edited version out loud. Change any sentence you would be embarrassed to sign.",
      "Save the edited version next to the brief. Write one line: the number or name you checked. That line is what an editor keeps.",
    ],
    video: { id: "2IK3DFHRFfw", title: "Generative AI in a Nutshell" },
    quiz: {
      mcq: [
        {
          prompt: "Evaluating a draft before you send it means…",
          choices: [
            "Checking names, numbers, and claims against a source, and cutting what does not belong",
            "Confirming the paragraphs look even, which counts as the evaluation",
            "Asking the same model whether it feels confident about the draft",
          ],
          answer: 0,
        },
        {
          prompt: "Sending the model's draft untouched can spread a mistake because…",
          choices: [
            "A specific prompt already evaluated the facts, so a second check only adds noise",
            "Fluent names and numbers can still be wrong, and your name is on the result",
            "The formatting is the verified part, and edits remove that check",
          ],
          answer: 1,
        },
      ],
      open: "Name one number or name you would check before sending a draft, and say where you would check it.",
    },
    source: { title: "Google AI Essentials", url: "https://grow.google/ai-essentials/", why: "Work habits, not slogans.", access: "Free to start." },
  },
  {
    slug: "one-tool",
    title: "Learn one tool properly",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "ChatGPT, Claude, and Gemini are the same kind of tool. Pick one and learn its limits.",
    paragraphs: [
      "You have a brief and an edited draft. Today you stop touring apps.",
      "ChatGPT, Claude, and Gemini are the same kind of tool with different wrappers. They are not unrelated inventions, and they are not search engines with no model inside.",
      "Switching apps every morning feels busy and teaches nothing. Depth with one tool beats a tour of ten. Stay with one long enough to know where it invents and where it helps.",
      "Tomorrow you will say what you would tell a boss you checked, using this same tool.",
    ],
    remember: "Depth with one tool beats a tour of ten.",
    watch: "You watched the start of this on day 3. Skip it today unless the three words have gone fuzzy. Spend the time inside one tool.",
    practice: [
      "Name the one tool you will use for the rest of this trail. Write the name at the top of your note.",
      "Give it the brief from day 11. Save the draft. Then ask the same brief again, and add one fact it got wrong or one limit from your reject list.",
      "Write two helps and one invention. A help is a sentence you would keep. An invention is a detail you did not give it and did not check.",
      "Stay in that tool for the next days. A new app tomorrow would throw away what you just learned.",
    ],
    video: { id: "G2fqAlgmoPo", title: "Introduction to Generative AI" },
    quiz: {
      mcq: [
        {
          prompt: "ChatGPT, Claude, and Gemini are…",
          choices: [
            "Search engines that return links and do not generate from a model",
            "Unrelated systems, so a limit in one says nothing about the others",
            "Different product wrappers around the same kind of language model",
          ],
          answer: 2,
        },
        {
          prompt: "Why stay with one model long enough to learn it?",
          choices: [
            "So you can see where that model helps and where it invents, instead of touring apps",
            "Because a new model name means the old failure modes are gone",
            "Because switching products each day is how you evaluate a draft",
          ],
          answer: 0,
        },
      ],
      open: "Which model will you practice with? Say one task you will use it for, and one kind of output you will not trust from it.",
    },
    source: { title: "AI for Everyone", url: "https://www.deeplearning.ai/courses/ai-for-everyone/", why: "Products change. The job does not.", access: "Free to start." },
  },
  {
    slug: "at-work",
    title: "How a job expects you to use it",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "At work the tool drafts. A person signs. You should be able to say what you checked.",
    paragraphs: [
      "You know one tool a little. Today put it in a job.",
      "At work the tool drafts. A person signs. Teams get in trouble when nobody owns the result. A finished work product needs a person who checked it. A clever prompt is not that person.",
      "If you cannot explain the draft, it is not yours yet. Sending it faster does not fix that. Adding adjectives does not fix that.",
      "After a rest day, the same habit meets a table: ask, then check the count yourself.",
    ],
    remember: "The tool drafts. You sign.",
    watch: "You watched the start of this on day 6. Skip it unless you want those 8 minutes again. The work is a sentence you could say to a boss.",
    practice: [
      "Using the tool you picked yesterday, draft a short note a boss might actually want. A status update, a summary of a public article, or a plan for a chore. No private data.",
      "Before you would send it, write five checks you did: the reader, one fact, one number or name, what you cut, and what you refused to trust.",
      "Say the five checks out loud in one breath, as if the boss asked what you checked. If you run out of real checks, you are not done. Go back and do one.",
      "Save the note and the five checks beside the day 12 draft. This is the work habit. The tool does not sign.",
    ],
    video: { id: "3-xhMXeYIcg", title: "Introduction to Responsible AI" },
    quiz: {
      mcq: [
        {
          prompt: "At work, a finished result that used a model still needs…",
          choices: [
            "Only a clever prompt, because the prompt is the review",
            "A person who can say what they checked and who signs the result",
            "The model name hidden, so nobody asks which claims were verified",
          ],
          answer: 1,
        },
        {
          prompt: "If you cannot explain the draft to a teammate, it is not yours yet because…",
          choices: [
            "You cannot say which claims you verified and which you refused to trust",
            "A longer prompt would have made those claims true",
            "Polishing the adjectives is the same check as looking up a fact",
          ],
          answer: 0,
        },
      ],
      open: "What would you tell a boss you checked? Name the claims, and name one thing you would not trust the model on.",
    },
    source: { title: "Google AI Essentials", url: "https://grow.google/ai-essentials/", why: "The workplace habits.", access: "Free to start." },
  },
  {
    slug: "sheets",
    title: "Ask questions of a table",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "A lot of real work is rows and columns. Give it the table, then ask a sharp question.",
    paragraphs: [
      "A lot of real jobs are rows and columns. Today you ask a question of a table, then you do the arithmetic that matters.",
      "Do not paste a sheet of real customer names. That stays out of the chat, the same rule as day 6. A made-up practice table is the right first paste. Whispering does not make a real sheet safe.",
      "Before you trust a total from the tool, check it. A neat layout is not a check. Adding rows you have not seen is not a check.",
      "Tomorrow you will meet a tool that can take the next step after it sees a result. Your hand total still wins.",
    ],
    remember: "You still do the arithmetic that matters.",
    watch: "Watch the whole video. It is about 2 minutes. It is a peek at Python, a language people use on bigger tables. You do not need to code today.",
    practice: [
      "Copy this made-up table into your note. These people are not real.\nAna — 2 hours — done\nBen — 5 hours — not done\nCho — 3 hours — done\nDee — 4 hours — not done",
      "By hand, add only the hours marked done. Write that total before you ask the tool. Then write the names that are not done.",
      "Paste the same table into your one tool. Ask how many hours are marked done, and who is not done. Save its answer.",
      "Compare. If it disagrees with your hand total, your hand wins. Write the question you would ask of a table at work, and the check you would do first.",
    ],
    video: { id: "x7X9w_GIm1s", title: "Python in 100 Seconds" },
    quiz: {
      mcq: [
        {
          prompt: "A total a chat model writes under a pasted table is…",
          choices: [
            "A predicted number. Even if a code tool ran the math, you still recompute the total that matters.",
            "The same as your spreadsheet running the formula, so neat formatting is the check",
            "Safe to extend with rows the model never showed you",
          ],
          answer: 0,
        },
        {
          prompt: "A sheet of real customer names should…",
          choices: [
            "Go in first, because real rows are a better evaluation than a practice table",
            "Stay out of the prompt. Use a made-up table until the question is sharp.",
            "Be safe to paste if the prompt says not to store it",
          ],
          answer: 1,
        },
      ],
      open: "What question would you ask of a small practice table, and which total or list would you compute yourself before you believed the model?",
    },
    source: { title: "AI Python for Beginners", url: "https://www.deeplearning.ai/courses/ai-python-for-beginners/", why: "Tables are the doorway into real data work.", access: "Free to start." },
  },
  {
    slug: "agents",
    title: "A tool that takes steps",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "An agent can click, search, or run something, then try again. More steps, more places to go wrong.",
    paragraphs: [
      "So far you asked, and you checked. An agent can take another step after it sees a result.",
      "An agent is a model, plus tools, plus a loop. It might search, click, or run something, then try again. More steps means more places to go wrong. A loop can repeat a mistake with great energy.",
      "It can still fail. The useful question is which tools it has, and who checks the result. A cute icon and a new name do not answer that.",
      "After a rest day, the answer has to come from a page you trust. An agent that searched the wrong page is still fluent.",
    ],
    remember: "An agent is a model, plus tools, plus a loop.",
    watch: "Watch the video. If it runs past 10 minutes, stop and do the practice. You need the idea, not every product name.",
    practice: [
      "Write a four-step chore you might really do: find a public page, draft a short note, check one fact, send the note.",
      "Next to each step, write tool or me. Sending, paying, and deleting stay with you. Finding and drafting can be the tool.",
      "Circle the one step you would not let a loop take alone. Write what you would look at before that step is allowed to happen.",
      "Say it in one sentence: an agent may take the next step, and I still check the last one. Keep that sentence for day 19.",
    ],
    video: { id: "F8NKVhkZZWI", title: "What are AI Agents?" },
    quiz: {
      mcq: [
        {
          prompt: "An agent is a model plus tools plus a loop. That matters because it can…",
          choices: [
            "Call a tool, see the result, and take another step without you typing each one",
            "Skip tools and still send, pay, or delete with no extra risk",
            "Stop itself whenever a step is wrong, so nobody has to check the loop",
          ],
          answer: 0,
        },
        {
          prompt: "Before an agent runs, what would you tell a teammate?",
          choices: [
            "A newer product name means the loop has been evaluated and is safe",
            "More steps make fewer mistakes, so the longest loop is the one to allow",
            "Which tools it can call, and which actions a person still has to approve",
          ],
          answer: 2,
        },
      ],
      open: "Name one action you would not let an agent take alone, and say what you would inspect before that step.",
    },
    source: { title: "Agentic AI", url: "https://www.deeplearning.ai/courses/agentic-ai/", why: "When you want the longer lap.", access: "Free to start." },
  },
  {
    slug: "documents",
    title: "Answer from a document you trust",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "Retrieval means: find a page, hand that page to the model, and demand it stick to the page.",
    paragraphs: [
      "Day 8 said open the link. Today you make that the whole method.",
      "Retrieval means: find a page, hand that page to the model, and demand it stick to the page. People call this RAG. It adds a search step before the answer. It does not add a guarantee, and it does not add a louder voice.",
      "If the search finds the wrong page, the answer can still sound sure. The model does not have to refuse. The page does not fix itself. This is how serious tools use notes they were given, without pretending the model memorized them.",
      "Tomorrow you will make one small thing from this trail and save it. The last day, you will explain that thing.",
    ],
    remember: "Give it the source. Then check the source.",
    watch: "Watch the video. If it runs past 10 minutes, stop. Then test the idea on a page you trust.",
    practice: [
      "Pick one page you trust and can share. A recipe, a public how-to, or the made-up table from day 15. Paste it, or attach it.",
      "Ask one question the page can answer. Tell the tool to use only that page. Then check the page yourself and mark the sentence it used.",
      "Ask one question the page cannot answer. Write whether it admitted the gap or invented a smooth reply. If it invented, the wrong page problem just happened in front of you.",
      "Name the document you would want a tool to read before it answered a real question at work. Write why you trust that document, and what you would still check.",
    ],
    video: { id: "T-D1OfcDW1M", title: "What is Retrieval-Augmented Generation (RAG)?" },
    quiz: {
      mcq: [
        {
          prompt: "Retrieval-augmented generation changes the answer by…",
          choices: [
            "Searching for text, placing that text in the context, then generating from it",
            "Guaranteeing the answer matches the source, so you can skip the page",
            "Adding a second model that refuses whenever the first model is unsure",
          ],
          answer: 0,
        },
        {
          prompt: "If retrieval returns the wrong passage, what can still happen?",
          choices: [
            "The model repairs the passage so the source matches the answer",
            "The model refuses, because generation can tell the passage is the wrong one",
            "The answer can still sound sure, because a fluent reply is not proof of the right page",
          ],
          answer: 2,
        },
      ],
      open: "Which document would you want retrieved before a model answered? Say what you would still check in that document, and what you would not trust if the passage did not support it.",
    },
    source: { title: "Retrieval Augmented Generation", url: "https://www.deeplearning.ai/courses/retrieval-augmented-generation/", why: "The idea, then the labs if you want them.", access: "Free to start." },
  },
  {
    slug: "make-one",
    title: "Make one small thing",
    part: "push",
    minutes: 30,
    coding: true,
    summary: "Ship a tiny aid you can show: a reusable brief, or ten lines of code you can explain.",
    paragraphs: [
      "You can ask, check, edit, and stick to a page. Today you make one small thing you can show later.",
      "A small thing counts when you can explain it with the tool closed. Long is not the goal. Someone else pressing run does not make it yours. Code you cannot explain is not yours yet.",
      "Two paths are enough. Path A is a reusable brief: the five lines from day 11, saved blank so you can fill them next time. Path B is about ten lines of code you can explain, only if you already want the code path.",
      "Save it where you can open it on the last study day. After a rest day, you will first explain one idea out loud. Then you will explain this thing.",
    ],
    remember: "If you cannot explain it, it is not yours.",
    watch: "This video is about how a net learns from mistakes. It is about 20 minutes. Watch the first 8 only if you want that picture. Making one small thing is the point of today.",
    practice: [
      "Pick path A or path B. Path A: write a blank brief with the five labels from day 11, plus one example you already edited on day 12. Path B: write about ten lines you understand, and a comment in plain words above them.",
      "Close the tool. On paper, write what the thing does, what you asked, what you checked, and what you would not trust.",
      "Save it under a name you can find on the last study day, without searching the chat history.",
      "Read those four lines with the tool still closed. If you cannot, it is not yours yet. Fix that before you stop. Day 20 uses this page.",
    ],
    video: { id: "IHZwWFHWa-w", title: "Gradient descent, how neural networks learn | 3Blue1Brown" },
    quiz: {
      mcq: [
        {
          prompt: "A small thing you made with a model counts as yours when…",
          choices: [
            "It is long, because length is the evaluation",
            "You can explain what it does, what you asked, and what you checked, with the model closed",
            "Someone else pressed run, so the result no longer needs an explanation",
          ],
          answer: 1,
        },
        {
          prompt: "Code a model wrote is not yours yet when…",
          choices: [
            "You cannot explain what each part does or how you would check it",
            "It runs, which means the behavior has already been reviewed",
            "You saved the file, which transfers the understanding to you",
          ],
          answer: 0,
        },
      ],
      open: "Say what you will finish, what you would check with the model closed, and what you would not trust about it.",
    },
    source: { title: "Hugging Face LLM Course, chapter 1", url: "https://huggingface.co/learn/llm-course/chapter1/1", why: "Using a model someone else trained.", access: free },
  },
  {
    slug: "judgment",
    title: "Explain one idea",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "Explain, in plain words, when a guess should stay closed.",
    paragraphs: [
      "You can make a small thing. Today you teach one idea to someone who was not on this trail.",
      "The idea is when to leave the tool closed. Some tasks should not be given to a guess: medical choices, legal choices, hiring, and anything that harms a person if it is wrong. A hiring decision made only by a model is a high-stakes guess. It is not done just because it was fast, and it is not required everywhere.",
      "Bias gets into a model mostly through the examples it learned from. The font does not do it. One unlucky click does not do it. A job in this field includes knowing when you are the wrong person to delegate.",
      "High stakes stay with a qualified person. Next time you will explain the small project the same way: plain words, out loud, to someone who was not here.",
    ],
    remember: "High stakes stay with a qualified person.",
    watch: "You have seen the start of this video. Watch the first 8 minutes again with one question in mind: where do people stay in charge? Then explain the idea out loud.",
    practice: [
      "Write the idea in four short sentences a friend could follow. What a model is. Why a smooth answer can be wrong. Why the examples can carry bias. Which decisions you will not hand over.",
      "Read it out loud to someone who has not done this trail. If you are alone, record a voice memo as if they are in the chair. No word you cannot explain. Trail words like RAG can wait unless you translate them.",
      "Ask what was confusing, or listen to the memo once. Fix one sentence so a person could repeat the idea.",
      "This is the first teach-back. Keep the four sentences. The last study day uses the same voice on the thing you saved.",
    ],
    video: { id: "3-xhMXeYIcg", title: "Introduction to Responsible AI" },
    quiz: {
      mcq: [
        {
          prompt: "A hiring decision made only by a model is…",
          choices: [
            "A finished evaluation, because a score does not need a person to explain it",
            "Required, because training data has already removed bias",
            "A high-stakes prediction, so a qualified person should own the decision",
          ],
          answer: 2,
        },
        {
          prompt: "Bias usually enters a model through…",
          choices: [
            "Patterns and gaps in the training data, which the model can repeat on new people",
            "A prompt that says to be fair, which deletes bias from the training data",
            "The product name, which selects which group the model prefers",
          ],
          answer: 0,
        },
      ],
      open: "Name one decision you will not hand to a model. Say what you would tell someone about why a fluent score is still a guess.",
    },
    source: { title: "Introduction to Responsible AI", url: "https://www.youtube.com/watch?v=3-xhMXeYIcg", why: "The first half is the lesson. You can stop there.", access: free },
  },
  {
    slug: "show-your-work",
    title: "Explain your project",
    part: "push",
    minutes: 30,
    coding: false,
    summary: "Explain the small thing you made, in plain words, to someone who was not here.",
    paragraphs: [
      "Yesterday you explained one idea. Today you explain the small thing from day 18.",
      "A project you can defend includes what you asked, what you checked, and what you refused to trust. The final paragraph alone is not enough. The logo of the tool is not enough.",
      "Say it to someone who was not on this trail, in the same plain voice as yesterday. If they cannot say it back in one sentence, the words are still too fancy. Shorten them and try again.",
      "The den after this is a letter, not a certificate. It is a shelf of next words, after you can explain your work. Paw prints and this quiz do not open it. Your friend gives you the word. The den is not a second chatbot, and it is not a substitute for today.",
    ],
    remember: "Show the check, not just the draft.",
    watch: "Watch this video after you read, before you explain. It is about 3 minutes. It names a doorway one program uses to ask another program for something. The den mentions that kind of word later. You do not need to build one.",
    practice: [
      "Open the small thing you saved on day 18. If the note is thin, spend the first part of today finishing the four lines: what it does, what you asked, what you checked, what you would not trust.",
      "Explain it out loud to someone who was not on the trail, or to a voice memo. Cover four parts: what you asked, what the tool returned, what you checked, and what you refused.",
      "Have them say it back in one sentence. If you are alone, pause the memo and try to say their sentence yourself. If you cannot, cut jargon and record it again.",
      "Write those four parts down and keep them. That page is the skill this month was building. Then the den can wait for the word.",
    ],
    video: { id: "s7wmiS2mSXY", title: "What is an API? (in 3 minutes)" },
    quiz: {
      mcq: [
        {
          prompt: "A project you can defend includes…",
          choices: [
            "Only the final paragraph, because the prompt and the checks were scaffolding",
            "What you asked, what you checked, and what you refused to trust",
            "The model name alone, because the name is the evaluation",
          ],
          answer: 1,
        },
        {
          prompt: "Calling a model through an API means…",
          choices: [
            "A program sends a structured request, often JSON, and gets a response you still have to check",
            "The API skips the model and returns a row that is already true",
            "JSON removes hallucination, so the response needs no evaluation",
          ],
          answer: 0,
        },
      ],
      open: "In a few sentences, say what you asked, what you checked, and what you would not trust. Include one thing you would tell someone who was not here.",
    },
    source: { title: "What is an API?", url: "https://www.youtube.com/watch?v=s7wmiS2mSXY", why: "The next shelf starts with this idea. Three minutes is enough.", access: free },
  },
];

export const days: DayPlan[] = [
  { id: 1, title: "The word", blurb: "Start from zero. A guess, not a person.", slugs: ["what-is-ai"] },
  { id: 2, title: "Three names", blurb: "Then rest a day.", slugs: ["three-ideas"] },
  { id: 3, title: "Already around you", blurb: "Find the guesses you already live with.", slugs: ["already-there"] },
  { id: 4, title: "Not the same as true", blurb: "Then rest a day.", slugs: ["limits"] },
  { id: 5, title: "A real ask", blurb: "Role, facts, and done.", slugs: ["prompts"] },
  { id: 6, title: "Keep it out", blurb: "Then rest a day.", slugs: ["careful"] },
  { id: 7, title: "What it can see", blurb: "This chat only. Not your life.", slugs: ["context"] },
  { id: 8, title: "Open the link", blurb: "Then rest a day.", slugs: ["check-the-link"] },
  { id: 9, title: "A pattern", blurb: "One picture of a neural net.", slugs: ["patterns"] },
  { id: 10, title: "How it writes", blurb: "Then rest. The harder half starts next.", slugs: ["chatbot"] },
  { id: 11, title: "A brief", blurb: "Write a job, not a wish.", tag: "harder", slugs: ["brief"] },
  { id: 12, title: "Edit it", blurb: "Then rest a day.", tag: "harder", slugs: ["editor"] },
  { id: 13, title: "One tool", blurb: "Learn one app properly.", tag: "harder", slugs: ["one-tool"] },
  { id: 14, title: "At work", blurb: "Then rest a day.", tag: "harder", slugs: ["at-work"] },
  { id: 15, title: "A table", blurb: "Ask a question, then check the count.", tag: "harder", slugs: ["sheets"] },
  { id: 16, title: "Steps", blurb: "Then rest a day.", tag: "harder", slugs: ["agents"] },
  { id: 17, title: "A trusted page", blurb: "Answer from a page, then check it.", tag: "harder", slugs: ["documents"] },
  { id: 18, title: "Make one thing", blurb: "Then rest a day.", tag: "harder", slugs: ["make-one"] },
  { id: 19, title: "Say one idea", blurb: "Explain it to someone who was not here.", tag: "explain", slugs: ["judgment"] },
  { id: 20, title: "Explain the project", blurb: "Plain words. Then the den.", tag: "explain", slugs: ["show-your-work"] },
];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function lessonsIn(part: PartId) {
  return lessons.filter((lesson) => lesson.part === part);
}

export function lessonDay(slug: string) {
  return days.find((day) => day.slugs.includes(slug));
}

export function lessonNeighbors(slug: string) {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: lessons[index - 1],
    next: lessons[index + 1],
  };
}
