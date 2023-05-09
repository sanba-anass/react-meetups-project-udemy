import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
function MeetupDetailsPage(props) {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
}
export async function getStaticPaths() {
	const client = await MongoClient.connect(
		"mongodb+srv://sanbaanass73:lFIXXO9bqjhJTuNX@cluster0.1sdtxeo.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
	client.close();

	return {
		paths: meetups.map((meetup) => {
			return {
				params: {
					meetupId: meetup._id.toString(),
				},
			};
		}),
		fallback: "blocking",
	};
}
export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	const client = await MongoClient.connect(
		"mongodb+srv://sanbaanass73:lFIXXO9bqjhJTuNX@cluster0.1sdtxeo.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetup = await meetupsCollection.findOne({
		_id: new ObjectId(meetupId),
	});
	client.close();

	return {
		props: {
			meetupData: {
				id: meetup._id.toString(),
				title: meetup.title,
				address: meetup.address,
				description: meetup.description,
				image: meetup.image,
			},
		},
	};
}
export default MeetupDetailsPage;
