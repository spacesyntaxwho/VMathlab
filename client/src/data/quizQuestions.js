export const quizQuestions = [
  {
    id: 1,
    category: "Theory",
    difficulty: "Easy",
    question: "What does a double integral $\\iint_D f(x,y) dA$ represent geometrically if $f(x,y) \\ge 0$?",
    options: [
      "The area of region D",
      "The volume under the surface $z=f(x,y)$ over region D",
      "The length of the curve $f(x,y)$",
      "The tangent plane to $f(x,y)$"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    category: "Theory",
    difficulty: "Easy",
    question: "Which theorem allows us to swap the order of integration for continuous functions?",
    options: [
      "Green's Theorem",
      "Stokes' Theorem",
      "Fubini's Theorem",
      "Fundamental Theorem of Calculus"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    category: "Theory",
    difficulty: "Medium",
    question: "If we integrate the function $f(x,y) = 1$ over a region D, what does the result represent?",
    options: [
      "The volume of a cylinder with base D",
      "The perimeter of D",
      "The area of region D",
      "Zero"
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    category: "Solving",
    difficulty: "Easy",
    question: "Evaluate $\\int_0^1 \\int_0^2 (1) dx dy$.",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1
  },
  {
    id: 5,
    category: "Solving",
    difficulty: "Medium",
    question: "Evaluate $\\int_0^1 \\int_0^1 (x+y) dx dy$.",
    options: ["1/2", "1", "3/2", "2"],
    correctAnswer: 1
  },
  {
    id: 6,
    category: "Solving",
    difficulty: "Medium",
    question: "Evaluate $\\int_0^2 \\int_0^y x dx dy$.",
    options: ["2/3", "4/3", "2", "8/3"],
    correctAnswer: 1
  },
  {
    id: 7,
    category: "Formula-based",
    difficulty: "Easy",
    question: "When converting to polar coordinates, what is $dA$?",
    options: [
      "$dx dy$",
      "$dr d\\theta$",
      "$r dr d\\theta$",
      "$r^2 dr d\\theta$"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    category: "Coordinate conversion",
    difficulty: "Medium",
    question: "What is the Cartesian region $x^2 + y^2 \\le 4$ in polar coordinates?",
    options: [
      "$0 \\le r \\le 4, 0 \\le \\theta \\le \\pi$",
      "$0 \\le r \\le 2, 0 \\le \\theta \\le 2\\pi$",
      "$0 \\le r \\le 4, 0 \\le \\theta \\le 2\\pi$",
      "$0 \\le r \\le 2, 0 \\le \\theta \\le \\pi/2$"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    category: "Solving",
    difficulty: "Hard",
    question: "Evaluate $\\iint_D e^{-(x^2+y^2)} dA$ where D is the entire $xy$-plane.",
    options: ["$\\pi/2$", "$\\pi$", "$2\\pi$", "$\\infty$"],
    correctAnswer: 1
  },
  {
    id: 10,
    category: "Region identification",
    difficulty: "Medium",
    question: "The limits $\\int_0^1 \\int_0^x f(x,y) dy dx$ describe integration over which triangular region?",
    options: [
      "Vertices (0,0), (1,0), (1,1)",
      "Vertices (0,0), (0,1), (1,1)",
      "Vertices (0,0), (1,0), (0,1)",
      "Vertices (1,0), (1,1), (0,1)"
    ],
    correctAnswer: 0
  }
];

// Note: In a full app, this array would contain 30+ questions. 
// For this MVP, we use 10 questions to demonstrate the functionality.
