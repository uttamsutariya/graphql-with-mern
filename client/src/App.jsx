import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Clients from "./components/clients/Clients";
import Projects from "./components/projects/Projects";
import Home from "./components/Home";
import AddClient from "./components/clients/AddClient";
import NotFound404 from "./components/NotFound404";
import ProjectDetails from "./components/projects/ProjectDetails";
import AddProject from "./components/projects/AddProject";

const client = new ApolloClient({
	uri: import.meta.env.VITE_GQL_API_URL,
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<BrowserRouter>
			<ApolloProvider client={client}>
				<div className={styles.container}>
					<Routes>
						<Route path="/" element={<Home />}>
							<Route
								path="/"
								element={
									<>
										<Projects />
										<Clients />
									</>
								}
							/>
							<Route path="client/add" element={<AddClient />} />
							<Route path="project/add" element={<AddProject />} />
							<Route path="project/:id" element={<ProjectDetails />} />
							<Route path="*" element={<NotFound404 />} />
						</Route>
					</Routes>
				</div>
			</ApolloProvider>
		</BrowserRouter>
	);
};

const styles = {
	container: "App max-w-[1200px] flex flex-col justify-center mx-auto",
};

export default App;
