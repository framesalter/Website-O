import { sci } from "./utils.js";

export const CONSTANTS = {
  G: 6.67e-11,
  ME: 5.97e24,
};

const G = CONSTANTS.G;
const ME = CONSTANTS.ME;

export const DEFAULT_PRESET = {
  label: "Default",
  bounds: {
    m:  { min: 500, max: 2000, step: 100 },
    r1: { min: 7.0e6, max: 9.0e6, step: 1e5 },
    r2: { min: 1.2e7, max: 2.0e7, step: 1e5 },
  },
};

export const BOUNDS = {
  m:  { min: 100, max: 5000, step: 50 },
  r1: { min: 6.6e6, max: 2.0e7, step: 1e5 },
  r2: { min: 8.0e6, max: 5.0e7, step: 1e5 },
};

const GMm = (g) => G * ME * g.m;

export const QUESTION_BANK = [
  // ================================================================
  // CARD: Item 1
  // ================================================================
  {
    id: "card-1",
    item: "1",
    title: "Item 1: Gravitational Force",
    defaultGivens: { m: 1200, r1: 7.0e6, r2: 1.4e7 },
    hints: [
      "Use Newton's law of universal gravitation: F = GMm/r².",
      "Substitute the satellite mass and the orbital distance in metres.",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `A satellite with mass $m = ${sci(g.m)}\\ \\text{kg}$ orbits Earth at a distance $r = ${sci(g.r1)}\\ \\text{m}$ from Earth's center. Using $G = ${sci(G, 3)}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ and $M_E = ${sci(ME, 3)}\\ \\text{kg}$, calculate the gravitational force exerted by Earth on the satellite. Give your answer to two significant figures.`,
        fields: [
          {
            id: "f",
            kind: "numeric",
            label: "F (N)",
            placeholder: "e.g. 1.5e3",
            expected: (g) => GMm(g) / (g.r1 * g.r1),
          },
        ],
        solution: (g) => {
          const F = GMm(g) / (g.r1 * g.r1);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r = ${sci(g.r1)}\\ \\text{m}$, $M_E = ${sci(ME, 3)}\\ \\text{kg}$`,
            required: `Gravitational force $F$`,
            equation: `$F = \\dfrac{G M_E m}{r^2}$`,
            substitution: `$F = \\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{(${sci(g.r1)})^2}$`,
            solution: `$F = ${sci(F)}\\ \\text{N}$`,
            answer: `$F = ${sci(F)}\\ \\text{N}$, directed toward Earth's center.`,
          };
        },
      },
    ],
  },

  // ================================================================
  // CARD: Item 2
  // ================================================================
  {
    id: "card-2",
    item: "2",
    title: "Item 2: Force Between Two Bodies",
    defaultGivens: { m: 7.35e22, r1: 3.84e8, r2: 1.0e9 },
    hints: [
      "Earth's mass is fixed at the constant value; the second body's mass varies.",
      "Substitute both masses and the center-to-center distance into F = GMm/r².",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `Two celestial bodies attract each other gravitationally. Earth has mass $M_E = ${sci(ME, 3)}\\ \\text{kg}$ and another body has mass $m = ${sci(g.m)}\\ \\text{kg}$. If their center-to-center distance is $r = ${sci(g.r1)}\\ \\text{m}$, using $G = ${sci(G, 3)}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$, calculate the gravitational force between them. Give your answer to two significant figures.`,
        fields: [
          {
            id: "f",
            kind: "numeric",
            label: "F (N)",
            placeholder: "e.g. 2.0e20",
            expected: (g) => GMm(g) / (g.r1 * g.r1),
          },
        ],
        solution: (g) => {
          const F = GMm(g) / (g.r1 * g.r1);
          return {
            given: `$M_E = ${sci(ME, 3)}\\ \\text{kg}$, $m = ${sci(g.m)}\\ \\text{kg}$, $r = ${sci(g.r1)}\\ \\text{m}$`,
            required: `Gravitational force $F$`,
            equation: `$F = \\dfrac{G M_E m}{r^2}$`,
            substitution: `$F = \\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{(${sci(g.r1)})^2}$`,
            solution: `$F = ${sci(F)}\\ \\text{N}$`,
            answer: `$F = ${sci(F)}\\ \\text{N}$, directed along the line joining their centers.`,
          };
        },
      },
    ],
  },

  // ================================================================
  // CARD: Item 3
  // ================================================================
  {
    id: "card-3",
    item: "3",
    title: "Item 3: Gravitational Potential Energy",
    defaultGivens: { m: 500, r1: 7.0e6, r2: 1.4e7 },
    hints: [
      "GPE for a satellite near Earth is GPE = -GMm/r.",
      "The negative sign means the satellite is bound to Earth.",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `A satellite with mass $m = ${sci(g.m)}\\ \\text{kg}$ is positioned at a distance $r = ${sci(g.r1)}\\ \\text{m}$ from the center of Earth. Using $G = ${sci(G, 3)}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ and $M_E = ${sci(ME, 3)}\\ \\text{kg}$, calculate its gravitational potential energy relative to an infinitely distant point. Give your answer to two significant figures.`,
        fields: [
          {
            id: "gpe",
            kind: "numeric",
            label: "GPE (J)",
            placeholder: "e.g. -5.7e10",
            expected: (g) => -GMm(g) / g.r1,
          },
        ],
        solution: (g) => {
          const gpe = -GMm(g) / g.r1;
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r = ${sci(g.r1)}\\ \\text{m}$`,
            required: `Gravitational potential energy $GPE$`,
            equation: `$GPE = -\\dfrac{G M_E m}{r}$`,
            substitution: `$GPE = -\\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{${sci(g.r1)}}$`,
            solution: `$GPE = ${sci(gpe)}\\ \\text{J}$`,
            answer: `$GPE = ${sci(gpe)}\\ \\text{J}$. The negative sign indicates the satellite is bound to Earth.`,
          };
        },
      },
    ],
  },

  // ================================================================
  // CARD: Item 4
  // ================================================================
  {
    id: "card-4",
    item: "4",
    title: "Item 4: Change in Gravitational Potential Energy",
    defaultGivens: { m: 1000, r1: 7.0e6, r2: 1.4e7 },
    hints: [
      "Compute GPE at each radius using GPE = -GMm/r.",
      "The change is ΔGPE = GPE₂ − GPE₁.",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `A satellite with mass $m = ${sci(g.m)}\\ \\text{kg}$ moves from an orbital radius $r_1 = ${sci(g.r1)}\\ \\text{m}$ to a higher radius $r_2 = ${sci(g.r2)}\\ \\text{m}$. Determine the change in gravitational potential energy $\\Delta GPE = GPE_2 - GPE_1$ to two significant figures, then select whether the change is positive or negative.`,
        fields: [
          {
            id: "dgpe",
            kind: "numeric",
            label: "ΔGPE (J)",
            placeholder: "e.g. 2.8e10",
            expected: (g) => -GMm(g) / g.r2 - -GMm(g) / g.r1,
          },
          {
            id: "sign",
            kind: "dropdown",
            label: "Sign of ΔGPE",
            options: [
              { value: "positive", text: "Positive (increase)" },
              { value: "negative", text: "Negative (decrease)" },
            ],
            correct: "positive",
          },
        ],
        solution: (g) => {
          const gpe1 = -GMm(g) / g.r1;
          const gpe2 = -GMm(g) / g.r2;
          const dgpe = gpe2 - gpe1;
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r_1 = ${sci(g.r1)}\\ \\text{m}$, $r_2 = ${sci(g.r2)}\\ \\text{m}$`,
            required: `$\\Delta GPE$ and its sign`,
            equation: `$\\Delta GPE = GPE_2 - GPE_1 = -\\dfrac{G M_E m}{r_2} - \\left(-\\dfrac{G M_E m}{r_1}\\right)$`,
            substitution: `$GPE_1 = ${sci(gpe1)}\\ \\text{J}$, $GPE_2 = ${sci(gpe2)}\\ \\text{J}$, $\\Delta GPE = (${sci(gpe2)}) - (${sci(gpe1)})$`,
            solution: `$\\Delta GPE = ${sci(dgpe)}\\ \\text{J}$. Since $r_2 > r_1$, $GPE$ becomes less negative, so the change is positive.`,
            answer: `$\\Delta GPE = ${sci(dgpe)}\\ \\text{J}$, and the change is positive.`,
          };
        },
      },
    ],
  },

  // ================================================================
  // CARD: Item 5
  // ================================================================
  {
    id: "card-5",
    item: "5",
    title: "Item 5: Orbital Speed and Kinetic Energy",
    defaultGivens: { m: 1000, r1: 7.0e6, r2: 1.4e7 },
    hints: [
      "For a circular orbit, v = √(GM/r).",
      "KE = ½ m v², and for circular orbits this equals GMm/(2r).",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `A satellite with mass $m = ${sci(g.m)}\\ \\text{kg}$ is moving in a circular orbit around Earth at radius $r = ${sci(g.r1)}\\ \\text{m}$. Using $G = ${sci(G, 3)}$ and $M_E = ${sci(ME, 3)}$, calculate its orbital speed to two significant figures.`,
        fields: [
          {
            id: "v",
            kind: "numeric",
            label: "v (m/s)",
            placeholder: "e.g. 7.5e3",
            expected: (g) => Math.sqrt(G * ME / g.r1),
          },
        ],
        solution: (g) => {
          const v = Math.sqrt(G * ME / g.r1);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r = ${sci(g.r1)}\\ \\text{m}$`,
            required: `Orbital speed $v$`,
            equation: `$v = \\sqrt{\\dfrac{G M_E}{r}}$`,
            substitution: `$v = \\sqrt{\\dfrac{(${sci(G, 3)})(${sci(ME, 3)})}{${sci(g.r1)}}}$`,
            solution: `$v = ${sci(v)}\\ \\text{m/s}$`,
            answer: `$v = ${sci(v)}\\ \\text{m/s}$`,
          };
        },
      },
      {
        id: "b",
        label: "(b)",
        prompt: (g) =>
          `For the same satellite of mass $m = ${sci(g.m)}\\ \\text{kg}$ in a circular orbit at $r = ${sci(g.r1)}\\ \\text{m}$, calculate its kinetic energy to two significant figures.`,
        fields: [
          {
            id: "ke",
            kind: "numeric",
            label: "KE (J)",
            placeholder: "e.g. 2.8e10",
            expected: (g) => GMm(g) / (2 * g.r1),
          },
        ],
        solution: (g) => {
          const KE = GMm(g) / (2 * g.r1);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r = ${sci(g.r1)}\\ \\text{m}$`,
            required: `Kinetic energy $KE$`,
            equation: `$KE = \\dfrac{G M_E m}{2r}$`,
            substitution: `$KE = \\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{2(${sci(g.r1)})}$`,
            solution: `$KE = ${sci(KE)}\\ \\text{J}$`,
            answer: `$KE = ${sci(KE)}\\ \\text{J}$`,
          };
        },
      },
    ],
  },

  // ================================================================
  // CARD: Item 6
  // ================================================================
  {
    id: "card-6",
    item: "6",
    title: "Item 6: Orbital Speed and Kinetic Energy Scaling",
    defaultGivens: { m: 1500, r1: 8.0e6, r2: 1.4e7 },
    hints: [
      "Same circular-orbit formulas as before: v = √(GM/r) and KE = GMm/(2r).",
      "KE depends on v², so doubling v changes KE by a factor of 2² = 4.",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `A satellite with mass $m = ${sci(g.m)}\\ \\text{kg}$ is placed in a circular orbit at distance $r = ${sci(g.r1)}\\ \\text{m}$ from Earth's center. Calculate its orbital speed to two significant figures.`,
        fields: [
          {
            id: "v",
            kind: "numeric",
            label: "v (m/s)",
            placeholder: "e.g. 7.1e3",
            expected: (g) => Math.sqrt(G * ME / g.r1),
          },
        ],
        solution: (g) => {
          const v = Math.sqrt(G * ME / g.r1);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r = ${sci(g.r1)}\\ \\text{m}$`,
            required: `Orbital speed $v$`,
            equation: `$v = \\sqrt{\\dfrac{G M_E}{r}}$`,
            substitution: `$v = \\sqrt{\\dfrac{(${sci(G, 3)})(${sci(ME, 3)})}{${sci(g.r1)}}}$`,
            solution: `$v = ${sci(v)}\\ \\text{m/s}$`,
            answer: `$v = ${sci(v)}\\ \\text{m/s}$`,
          };
        },
      },
      {
        id: "b",
        label: "(b)",
        prompt: (g) =>
          `For the same satellite of mass $m = ${sci(g.m)}\\ \\text{kg}$ in a circular orbit at $r = ${sci(g.r1)}\\ \\text{m}$, calculate its kinetic energy to two significant figures.`,
        fields: [
          {
            id: "ke",
            kind: "numeric",
            label: "KE (J)",
            placeholder: "e.g. 3.7e10",
            expected: (g) => GMm(g) / (2 * g.r1),
          },
        ],
        solution: (g) => {
          const KE = GMm(g) / (2 * g.r1);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r = ${sci(g.r1)}\\ \\text{m}$`,
            required: `Kinetic energy $KE$`,
            equation: `$KE = \\dfrac{G M_E m}{2r}$`,
            substitution: `$KE = \\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{2(${sci(g.r1)})}$`,
            solution: `$KE = ${sci(KE)}\\ \\text{J}$`,
            answer: `$KE = ${sci(KE)}\\ \\text{J}$`,
          };
        },
      },
      {
        id: "c",
        label: "(c)",
        prompt: () =>
          `If the satellite's orbital speed doubles while its mass remains constant, select what happens to its kinetic energy. (This is a conceptual scaling question.)`,
        fields: [
          {
            id: "scaling",
            kind: "dropdown",
            label: "KE becomes...",
            options: [
              { value: "half", text: "Halves (×½)" },
              { value: "same", text: "Stays the same (×1)" },
              { value: "double", text: "Doubles (×2)" },
              { value: "quad", text: "Quadruples (×4)" },
            ],
            correct: "quad",
          },
        ],
        solution: () => ({
          given: `Kinetic energy is $KE = \\tfrac{1}{2}mv^2$, mass $m$ is constant.`,
          required: `How $KE$ changes when $v$ doubles.`,
          equation: `$KE = \\tfrac{1}{2} m v^2$`,
          substitution: `If $v \\to 2v$, then $KE \\to \\tfrac{1}{2}m(2v)^2 = \\tfrac{1}{2}m(4v^2) = 4\\left(\\tfrac{1}{2}mv^2\\right)$`,
          solution: `$KE$ becomes four times the original value.`,
          answer: `KE quadruples (×4) because KE scales as v².`,
        }),
      },
    ],
  },

  // ================================================================
  // CARD: Items 7-8
  // ================================================================
  {
    id: "card-7-8",
    item: "7-8",
    title: "Items 7-8: Energy Changes Between Orbits",
    defaultGivens: { m: 1000, r1: 7.0e6, r2: 1.4e7 },
    hints: [
      "The total mechanical energy of a circular orbit is U = -GMm/(2r).",
      "As r increases, KE decreases and the magnitude of PE decreases.",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `A satellite of mass $m = ${sci(g.m)}\\ \\text{kg}$ is in a circular parking orbit at $r_1 = ${sci(g.r1)}\\ \\text{m}$ from Earth's center and is moved to a higher circular orbit at $r_2 = ${sci(g.r2)}\\ \\text{m}$. Using $G = ${sci(G, 3)}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ and $M_E = ${sci(ME, 3)}\\ \\text{kg}$, calculate the total mechanical energy $U_1$ in the initial orbit and $U_2$ in the higher orbit. Give each answer in joules to two significant figures.`,
        fields: [
          { id: "u1", kind: "numeric", label: "U1 (J)", placeholder: "e.g. -2.5e10", expected: (g) => -GMm(g) / (2 * g.r1) },
          { id: "u2", kind: "numeric", label: "U2 (J)", placeholder: "e.g. -1.2e10", expected: (g) => -GMm(g) / (2 * g.r2) },
        ],
        solution: (g) => {
          const U1 = -GMm(g) / (2 * g.r1);
          const U2 = -GMm(g) / (2 * g.r2);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r_1 = ${sci(g.r1)}\\ \\text{m}$, $r_2 = ${sci(g.r2)}\\ \\text{m}$`,
            required: `$U_1$ and $U_2$`,
            equation: `$U = -\\dfrac{G M_E m}{2 r}$`,
            substitution: `$U_1 = -\\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{2(${sci(g.r1)})}$, $U_2 = -\\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{2(${sci(g.r2)})}$`,
            solution: `$U_1 = ${sci(U1)}\\ \\text{J}$, $U_2 = ${sci(U2)}\\ \\text{J}$`,
            answer: `$U_1 = ${sci(U1)}\\ \\text{J}$ and $U_2 = ${sci(U2)}\\ \\text{J}$.`,
          };
        },
      },
      {
        id: "b",
        label: "(b)",
        prompt: () =>
          `Find the change in total energy $\\Delta U = U_2 - U_1$ in joules to two significant figures, then select whether energy was added to or removed from the satellite.`,
        fields: [
          { id: "du", kind: "numeric", label: "ΔU (J)", placeholder: "e.g. 1.2e10", expected: (g) => -GMm(g) / (2 * g.r2) - -GMm(g) / (2 * g.r1) },
          { id: "added", kind: "dropdown", label: "Is energy added or removed?", options: [
            { value: "added", text: "Energy is added" },
            { value: "removed", text: "Energy is removed" },
          ], correct: "added" },
        ],
        solution: (g) => {
          const U1 = -GMm(g) / (2 * g.r1);
          const U2 = -GMm(g) / (2 * g.r2);
          const dU = U2 - U1;
          return {
            given: `$U_1 = ${sci(U1)}\\ \\text{J}$, $U_2 = ${sci(U2)}\\ \\text{J}$`,
            required: `$\\Delta U$ and whether energy is added or removed`,
            equation: `$\\Delta U = U_2 - U_1$`,
            substitution: `$\\Delta U = (${sci(U2)}) - (${sci(U1)})$`,
            solution: `$\\Delta U = ${sci(dU)}\\ \\text{J}$. Since this is positive, energy is added.`,
            answer: `$\\Delta U = ${sci(dU)}\\ \\text{J}$. Energy is added to the satellite.`,
          };
        },
      },
      {
        id: "c",
        label: "(c)",
        prompt: (g) =>
          `As the satellite moves from $r_1 = ${sci(g.r1)}\\ \\text{m}$ to $r_2 = ${sci(g.r2)}\\ \\text{m}$, select what happens to its kinetic energy and to its gravitational potential energy. (This is a conceptual question, not a calculation.)`,
        fields: [
          { id: "ke", kind: "dropdown", label: "Kinetic energy", options: [
            { value: "increases", text: "Kinetic energy increases" },
            { value: "decreases", text: "Kinetic energy decreases" },
          ], correct: "decreases" },
          { id: "gpe", kind: "dropdown", label: "Gravitational potential energy", options: [
            { value: "increases", text: "Gravitational potential energy increases" },
            { value: "decreases", text: "Gravitational potential energy decreases" },
          ], correct: "increases" },
        ],
        solution: () => ({
          given: `The satellite moves from a smaller radius to a larger radius.`,
          required: `Direction of change of KE and GPE`,
          equation: `$KE = \\dfrac{G M_E m}{2 r}$, $PE = -\\dfrac{G M_E m}{r}$`,
          solution: `At larger $r$, $KE$ is smaller because the satellite moves more slowly. $PE$ becomes less negative, so it increases.`,
          answer: `Kinetic energy decreases and gravitational potential energy increases (becomes less negative).`,
        }),
      },
    ],
  },

  // ================================================================
  // CARD: Item 9
  // ================================================================
  {
    id: "card-9",
    item: "9",
    title: "Item 9: Mathematical Analysis",
    defaultGivens: { m: 1000, r1: 7.0e6, r2: 1.4e7 },
    hints: [
      "The relationship U₁ × r₁ = U₂ × r₂ lets you solve for U₂ once U₁ is known.",
      "Keep extra digits during intermediate steps. Round only the final answer.",
    ],
    subQuestions: [
      {
        id: "a",
        label: "(a)",
        prompt: (g) =>
          `Use the relationship $U_1 r_1 = U_2 r_2$ to find the total mechanical energy $U_2$ at the higher radius $r_2 = ${sci(g.r2)}\\ \\text{m}$. First compute $U_1$ for $r_1 = ${sci(g.r1)}\\ \\text{m}$ with $U_1 = -GM_E m/(2r_1)$, then apply the relationship. Give each answer to two significant figures. *Hint: keep extra digits during intermediate calculations and round only the final answers.*`,
        fields: [
          { id: "u1", kind: "numeric", label: "U1 (J)", placeholder: "e.g. -2.5e10", expected: (g) => -GMm(g) / (2 * g.r1) },
          { id: "u2", kind: "numeric", label: "U2 (J)", placeholder: "e.g. -1.2e10", expected: (g) => -GMm(g) / (2 * g.r2) },
        ],
        solution: (g) => {
          const U1 = -GMm(g) / (2 * g.r1);
          const U2 = U1 * g.r1 / g.r2;
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r_1 = ${sci(g.r1)}\\ \\text{m}$, $r_2 = ${sci(g.r2)}\\ \\text{m}$`,
            required: `$U_1$ and $U_2$`,
            equation: `$U_1 = -\\dfrac{G M_E m}{2 r_1}$, then $U_2 = U_1 \\cdot \\dfrac{r_1}{r_2}$`,
            substitution: `$U_1 = ${sci(U1)}\\ \\text{J}$, $U_2 = (${sci(U1)})\\left(\\dfrac{${sci(g.r1)}}{${sci(g.r2)}}\\right)$`,
            solution: `$U_2 = ${sci(U2)}\\ \\text{J}$`,
            answer: `$U_1 = ${sci(U1)}\\ \\text{J}$ and $U_2 = ${sci(U2)}\\ \\text{J}$.`,
          };
        },
      },
      {
        id: "b",
        label: "(b)",
        prompt: (g) =>
          `Verify $U_2$ using $U = -GM_E m/(2r)$ with $r = r_2 = ${sci(g.r2)}\\ \\text{m}$. Then select whether the verification matches your value in (a) and what happens to the total mechanical energy as the radius increases.`,
        fields: [
          { id: "u2_verify", kind: "numeric", label: "U2 verified (J)", placeholder: "e.g. -1.2e10", expected: (g) => -GMm(g) / (2 * g.r2) },
          { id: "matches", kind: "dropdown", label: "Does it match (a)?", options: [
            { value: "matches", text: "Matches the value in (a)" },
            { value: "no", text: "Does not match the value in (a)" },
          ], correct: "matches" },
          { id: "trend", kind: "dropdown", label: "Total energy trend", options: [
            { value: "increases", text: "Total energy increases as r increases" },
            { value: "decreases", text: "Total energy decreases as r increases" },
          ], correct: "increases" },
        ],
        solution: (g) => {
          const U2 = -GMm(g) / (2 * g.r2);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r_2 = ${sci(g.r2)}\\ \\text{m}$`,
            required: `Verification of $U_2$, match status, and trend`,
            equation: `$U = -\\dfrac{G M_E m}{2 r}$`,
            substitution: `$U_2 = -\\dfrac{(${sci(G, 3)})(${sci(ME, 3)})(${sci(g.m)})}{2(${sci(g.r2)})}$`,
            solution: `$U_2 = ${sci(U2)}\\ \\text{J}$, which matches (a). As $r$ increases, $U$ becomes less negative, so it increases.`,
            answer: `The verification matches. As the radius increases, the total mechanical energy increases (becomes less negative).`,
          };
        },
      },
    ],
  },

  // ================================================================
  // CARD: Item 10
  // ================================================================
  {
    id: "card-10",
    item: "10",
    title: "Item 10: Satellite Mission Problem",
    defaultGivens: { m: 1000, r1: 7.0e6, r2: 1.4e7 },
    hints: [
      "Use the same energy formulas from earlier items.",
      "KE in a circular orbit equals the magnitude of U in that same orbit.",
    ],
    subQuestions: [
      {
        id: "main",
        label: "",
        prompt: (g) =>
          `A satellite of mass $m = ${sci(g.m)}\\ \\text{kg}$ is in a parking orbit at $r_1 = ${sci(g.r1)}\\ \\text{m}$ and must be moved to an operational orbit at $r_2 = ${sci(g.r2)}\\ \\text{m}$. Determine the total mechanical energy in each orbit, the energy $\\Delta U$ that must be added, and the initial kinetic energy $KE_1$. Then compare $\\Delta U$ with $KE_1$. Give all numeric answers to two significant figures.`,
        fields: [
          { id: "u1", kind: "numeric", label: "U1 (J)", placeholder: "e.g. -2.5e10", expected: (g) => -GMm(g) / (2 * g.r1) },
          { id: "u2", kind: "numeric", label: "U2 (J)", placeholder: "e.g. -1.2e10", expected: (g) => -GMm(g) / (2 * g.r2) },
          { id: "du", kind: "numeric", label: "ΔU (J)", placeholder: "e.g. 1.2e10", expected: (g) => -GMm(g) / (2 * g.r2) - -GMm(g) / (2 * g.r1) },
          { id: "ke1", kind: "numeric", label: "KE1 (J)", placeholder: "e.g. 2.5e10", expected: (g) => GMm(g) / (2 * g.r1) },
          { id: "cmp", kind: "dropdown", label: "ΔU compared with KE1", options: [
            { value: "gt", text: "ΔU is greater than KE1" },
            { value: "lt", text: "ΔU is less than KE1" },
          ], correct: "lt" },
        ],
        solution: (g) => {
          const U1 = -GMm(g) / (2 * g.r1);
          const U2 = -GMm(g) / (2 * g.r2);
          const dU = U2 - U1;
          const KE1 = GMm(g) / (2 * g.r1);
          return {
            given: `$m = ${sci(g.m)}\\ \\text{kg}$, $r_1 = ${sci(g.r1)}\\ \\text{m}$, $r_2 = ${sci(g.r2)}\\ \\text{m}$`,
            required: `$U_1$, $U_2$, $\\Delta U$, $KE_1$, and the comparison`,
            equation: `$U = -\\dfrac{G M_E m}{2 r}$, $\\Delta U = U_2 - U_1$, $KE_1 = \\dfrac{G M_E m}{2 r_1}$`,
            substitution: `$U_1 = ${sci(U1)}\\ \\text{J}$, $U_2 = ${sci(U2)}\\ \\text{J}$, $\\Delta U = ${sci(dU)}\\ \\text{J}$, $KE_1 = ${sci(KE1)}\\ \\text{J}$`,
            solution: `$\\Delta U = ${sci(dU)}\\ \\text{J}$ and $KE_1 = ${sci(KE1)}\\ \\text{J}$, so $\\Delta U < KE_1$.`,
            answer: `$U_1 = ${sci(U1)}\\ \\text{J}$, $U_2 = ${sci(U2)}\\ \\text{J}$, $\\Delta U = ${sci(dU)}\\ \\text{J}$, $KE_1 = ${sci(KE1)}\\ \\text{J}$. The added energy is less than the initial kinetic energy.`,
          };
        },
      },
    ],
  },
];