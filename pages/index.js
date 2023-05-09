import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
	return (
		<>
			<Head>
				<title>React meetups 2!!</title>
				<meta
					name="description"
					content="browse a huge list of highly active React meetups"
					color="#ff0000"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

export async function getServerSideProps() {
	const client = await MongoClient.connect(
		"mongodb+srv://sanbaanass73:lFIXXO9bqjhJTuNX@cluster0.1sdtxeo.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");
	const meetups = await meetupsCollection.find().toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
			revalidate: 300,
		},
	};
}

export default HomePage;
