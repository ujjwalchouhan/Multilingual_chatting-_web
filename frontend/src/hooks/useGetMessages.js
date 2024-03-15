import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useLangContext } from "../context/LangContext";


const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { language, rec_lang } = useLangContext();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ language })
				};
				console.log(requestOptions);
				const res = await fetch(`/api/messages/${selectedConversation._id}`, requestOptions);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);

			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
