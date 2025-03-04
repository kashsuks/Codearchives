// problems/sumOfPrimes2.js
const sumOfPrimes2 = {
    id: "sumOfPrimes2",
    title: "Sum of Primes 2",
    category: "Mathematics",
    points: 5,
    timeLimit: "0.6s",
    memoryLimit: "64M",
    author: "Sob",
    problemType: "Ad-hoc",
    inputSpecification: "The first line contains a single integer: Q.\nEach of the next Q lines contains two space-separated integers: A, B.",
    outputSpecification: "Output the answer to each question on a separate line.",
    constraints: "1 ≤ Q ≤ 10^5\n1 ≤ A < B ≤ 10^6",
    subtasks: [
        { title: "Subtask 1 [20%]", description: "1 ≤ Q ≤ 1000\n1 ≤ A < B ≤ 1000" },
        { title: "Subtask 2 [80%]", description: "No additional constraints." }
    ],
    sampleInput: "3\n1 2\n5 11\n3 19",
    sampleOutput: "2\n28\n75"
};

export default sumOfPrimes2;