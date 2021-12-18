const BASE_URL = process.env.REACT_APP_DEV_API_BE;

export const createClient = async () => {
  try {
    const response = await fetch(BASE_URL + "/clients/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      //data: { id, token }
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      history.push("/profile");
      // return data
    }
  } catch (error) {
    console.log(error);
  }
};
