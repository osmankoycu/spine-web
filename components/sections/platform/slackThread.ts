// Content for the People Ops Slack window (pillar 03, right column). The thread
// mirrors the left-column timeline beat for beat — You make the hire, Spine
// onboards, runs payroll, and keeps the rest moving — except it happens where
// the team already works. The weekly digest block carries the numbers the old
// payroll console used to show ($293K processed, 47 active, the open queue).

export type TaskRow = {
  /** done → green check + neutral tag; open → orange clock + orange tag */
  done: boolean;
  label: string;
  tag: string;
};

export type Stat = { label: string; value: string; note: string; good?: boolean };

export type Block =
  | { kind: "text"; text: string }
  | { kind: "tasks"; title: string; rows: TaskRow[] }
  | { kind: "digest"; title: string; stats: Stat[]; rows: TaskRow[] }
  | {
      kind: "person";
      initials: string;
      name: string;
      role: string;
      status: string;
      action: string;
    };

export type Message = {
  id: string;
  author: "human" | "spine";
  name: string;
  initials: string;
  time: string;
  /** show a "Spine is typing…" beat before this message during the replay */
  typing?: boolean;
  blocks: Block[];
};

export const workspace = {
  name: "Northwind",
  channel: "spine-hr",
  topic: "Hiring, payroll & compliance",
  members: "24",
  channels: [
    { name: "general" },
    { name: "people-ops" },
    { name: "spine-hr", active: true },
    { name: "payroll", badge: "3" },
  ],
};

export const thread: Message[] = [
  {
    id: "hire",
    author: "human",
    name: "Maya Chen",
    initials: "MC",
    time: "9:02 AM",
    blocks: [
      {
        kind: "text",
        text: "we signed Sarah K. — engineer, remote in Austin. she starts Monday.",
      },
    ],
  },
  {
    id: "onboard",
    author: "spine",
    name: "Spine",
    initials: "S",
    time: "9:02 AM",
    typing: true,
    blocks: [
      {
        kind: "text",
        text: "On it. Day one is covered and she lands in Friday's payroll run:",
      },
      {
        kind: "tasks",
        title: "Onboarding · Sarah K. · Eng, remote-TX",
        rows: [
          { done: true, label: "I-9 and E-Verify filed", tag: "Done" },
          { done: true, label: "Texas accounts + benefits enrollment", tag: "Filed" },
          { done: false, label: "Countersign the offer letter", tag: "Needs you" },
        ],
      },
    ],
  },
  {
    id: "signed",
    author: "human",
    name: "Maya Chen",
    initials: "MC",
    time: "9:04 AM",
    blocks: [{ kind: "text", text: "signed. anything else from me this cycle?" }],
  },
  {
    id: "digest",
    author: "spine",
    name: "Spine",
    initials: "S",
    time: "9:04 AM",
    typing: true,
    blocks: [
      { kind: "text", text: "Nothing. Here's where the week stands:" },
      {
        kind: "digest",
        title: "This week · people ops",
        stats: [
          { label: "Payroll", value: "$293K", note: "Processed Friday", good: true },
          { label: "Active", value: "47", note: "+3 onboarding" },
        ],
        rows: [
          { done: true, label: "Final paycheck issued · J. Chen", tag: "Complete" },
          { done: false, label: "Benefits enrollment · open window", tag: "5 days left" },
        ],
      },
      {
        kind: "person",
        initials: "PN",
        name: "Priya Nair",
        role: "Senior Payroll Specialist",
        status: "Reviewing Friday's run",
        action: "In the loop",
      },
    ],
  },
];
