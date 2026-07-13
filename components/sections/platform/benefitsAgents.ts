// Data for the "For employees" half of the Benefits pillar. The avatar rail
// below the copy lets you pick an agent; the phone mockup on the right then
// swaps its header, picture-in-picture video, input placeholder, and the chat
// thread (one employee question → the agent's reply) to that agent. The reply
// is the line the agent "speaks" in the PiP video, looped in a later phase.
//
// Assets live in /public/agents (<id>.png avatar, <id>.mp4 talking clip).

export type BenefitsAgent = {
  id: string;
  name: string; // phone header + input placeholder
  bubble: string; // label pill above the avatar (\n splits to two lines)
  question: string; // employee's incoming message (left, white bubble)
  answer: string[]; // the agent's reply, one bubble per line (right, aqua)
};

export const BENEFITS_AGENTS: BenefitsAgent[] = [
  {
    id: "care",
    name: "Care Finder",
    bubble: "Care\nFinder",
    question: "I got a $1,200 ER bill, is this right?",
    answer: [
      "Looking into it now, hang tight.",
      "Found it — you were billed out-of-network by mistake. We're disputing it for you.",
    ],
  },
  {
    id: "plan",
    name: "Plan Comparison",
    bubble: "Plan\nComparison",
    question: "Which plan is actually better for my family?",
    answer: [
      "Comparing your options now.",
      "The PPO saves you about $840 a year for how your family uses care. Want me to switch you at open enrollment?",
    ],
  },
  {
    id: "pharmacy",
    name: "Pharmacy Navigation",
    bubble: "Pharmacy\nNavigation",
    question: "My prescription is $180 this month?",
    answer: [
      "Checking pharmacy pricing.",
      "There's a covered generic at $12 — I sent the switch to your pharmacy for pickup.",
    ],
  },
  {
    id: "benefits",
    name: "Benefits & Coverage",
    bubble: "Benefits &\nCoverage",
    question: "Is my MRI going to be covered?",
    answer: [
      "Pulling up your coverage.",
      "Yes — covered at 90% after your deductible, so your share is about $140.",
    ],
  },
  {
    id: "fightback",
    name: "FightBack Agent",
    bubble: "FightBack\nAgent",
    question: "My claim got denied. Can you help?",
    answer: [
      "On it — reviewing the denial reason.",
      "This was denied in error. I've filed an appeal with the records to get it overturned.",
    ],
  },
];
