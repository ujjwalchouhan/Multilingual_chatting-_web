import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";


const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter '
			style={{
				background: 'linear-gradient(177.9deg, rgb(62 61 67) 3.6%, rgb(26 30 40) 50.8%)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
			}}
		>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
