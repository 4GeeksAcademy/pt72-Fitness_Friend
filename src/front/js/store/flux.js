const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user: null,
      token: sessionStorage.getItem("token"),
       favs: []
    },
    actions: {
      // Use getActions to call a function within a fuction

      login: async (email, password) => {
        let response = await fetch(process.env.BACKEND_URL + "/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        let data = await response.json();
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("user", data.user);
      },
      logout: () => {
        sessionStorage.setItem("token", null);
      },

      updateUser: async (formData, pic) => {
        let response = await fetch(process.env.BACKEND_URL + "/update_user", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            height: formData.height,
            name: formData.name,
            last_name: formData.last_name,
            weight: formData.weight,
          }),
        });

        if (response.ok) {
          let data = await response.json();
          setStore({ user: data.updated_user }); // Update the global store with the new user data
        } else {
          console.error("Failed to update user:", response.status);
        }
      },

      getUser: async () => {
        let response = await fetch(process.env.BACKEND_URL + "/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setStore({ user: data });
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
      },

      logout: async () => {
        sessionStorage.setItem("token", null);
      },
      addFavs: (fav, type) => {
                const store = getStore();
                setStore({ favs: [...store.favs, {...fav, type}] });
            },
            removeFavs: (fav) => {
                const store = getStore();
                const newFavs = store.favs.filter(favorite => favorite.idMeal !== fav.idMeal || favorite.type !== fav.type);
                setStore({ favs: newFavs });
            },
        
        
        
        
        
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();
        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
