import axios from "axios";

const path = "/documents";

export async function getDocument(documentName) {
  try {
    const response = await axios.get(`${path}/${documentName}`);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error("document not available");
  }
}
