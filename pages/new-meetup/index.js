import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
function NewMeetupPage() {
	const router = useRouter();
	const addMeetupHandler = async (enteredMeetupData) => {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMeetupData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		router.push("/");
	};
	return (
		<>
			<Head>
				<title>Add New Meetup</title>
				<meta
					name="description"
					content="Add your own meetups and create amazing networking opportunities"
					color="#ff0000"
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);
}
export default NewMeetupPage;
