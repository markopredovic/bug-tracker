import { useState } from "react";

const useForm = (initialData) => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setData({ ...data, [e.target.name]: e.target.checked });
    } else if (e.target.type === "select-multiple") {
      let ids = Array.from(e.target.selectedOptions);
      ids = ids.map((id) => id.value);
      setData({ ...data, [e.target.name]: ids });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return [data, setData, handleChange];
};

export { useForm };
