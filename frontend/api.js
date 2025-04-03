const API_URL = "http://localhost:3000";


async function getClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    return response.json();
}


async function addCliente(cliente) {
    await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    });

    function App() {
        return (
            <div className="App">
                <h1>TechLogistics</h1>
                <Clientes />
            </div>
        );
    }
    
   
    ReactDOM.render(<App />, document.getElementById("root"));
    

}
