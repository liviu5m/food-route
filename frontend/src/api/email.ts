import axios from "axios";

export async function sendEmail(
  userId: number,
  subject: string,
  comment: string
) {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/api/email",
    {
      userId,
      subject,
      comment,
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
}
