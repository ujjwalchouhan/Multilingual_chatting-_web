import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import { useAuthContext } from "../../context/AuthContext";
const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>

			<Profile />
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}



			{
				conversations.map((conversation, idx) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emoji={getRandomEmoji()}
						lastIdx={idx === conversations.length - 1}
					/>
				))
			}
		</div >
	);
};
export default Conversations;

const Profile = () => {
	const { authUser } = useAuthContext();
	return (
		<div >
			{/*<p>{authUser.fullName}⭐
				<div className="btn-group">
					<button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Select language
					</button>
					<ul className="dropdown-menu">
						<Send /><Recev />
					</ul>
				</div>
	</p>*/}
		</div>
	);
};




// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;
