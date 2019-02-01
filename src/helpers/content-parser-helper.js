export function getCandidateName(content, fallback = "candidate") {
  const regex = /.*\*{2}Candidate\*{2}:\s*(.*)/g;
  const results = regex.exec(content);
  const target = (results && results.length === 2 && results[1]) || fallback;
  return target;
}

export function getInterviewerName(content, fallback = "interviewer") {
  const regex = /.*\*{2}Interviewer\*{2}:\s*(.*)/g;
  const results = regex.exec(content);
  const target = (results && results.length === 2 && results[1]) || fallback;
  return target;
}
