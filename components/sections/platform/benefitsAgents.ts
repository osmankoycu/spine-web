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
  railBottom?: string; // per-avatar bottom offset in the rail; used to sink a
  // figure whose lower body is white-on-white (would otherwise read as floating)
  // below the mask so its coloured mass rests on the floor line.
};

export const BENEFITS_AGENTS: BenefitsAgent[] = [
  {
    id: "care",
    name: "Care Finder",
    bubble: "Care\nFinder",
    question: "I need a dermatologist who speaks Spanish.",
    answer: [
      "Looking for in-network dermatologists near you...",
      "I found four in-network dermatologists within 15 minutes. Two speak Spanish and the earliest appointment is tomorrow at 9:30 AM.",
    ],
  },
  {
    id: "plan",
    name: "Plan Picker",
    bubble: "Plan\nPicker",
    question: "My wife is pregnant. Which plan should we choose?",
    answer: [
      "Comparing your plan options based on your expected healthcare needs...",
      "I'd recommend the PPO. It costs about $45 more per paycheck, but you'll likely save around $2,300 this year based on your expected care.",
    ],
  },
  {
    id: "pharmacy",
    name: "Meds Finder",
    bubble: "Meds\nFinder",
    question: "Ozempic isn't covered. What are my options?",
    answer: [
      "Checking your plan and covered alternatives...",
      "Wegovy requires prior authorization, but Zepbound is covered with a $30 copay. I can also help you start the prior authorization if you'd prefer Ozempic.",
    ],
  },
  {
    id: "benefits",
    name: "Check Coverage",
    bubble: "Check\nCoverage",
    question: "Does my plan cover therapy?",
    answer: [
      "Let me check your benefits.",
      "Yes. Therapy is covered after a $25 copay when you see an in-network provider. I can also help you find one nearby.",
    ],
  },
  {
    id: "fightback",
    name: "FightBack",
    bubble: "FightBack",
    question: "I got a $1,200 ER bill. Is this right?",
    answer: [
      "Looking into it now, hang tight.",
      "Found it—you were billed out-of-network by mistake. We're disputing it for you.",
    ],
  },
];
