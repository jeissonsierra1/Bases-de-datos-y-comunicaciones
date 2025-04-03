function Clientes() {
    const [clientes, setClientes] = React.useState([]);
    const [nuevoCliente, setNuevoCliente] = React.useState({ nombre: "", email: "", telefono: "" });

    React.useEffect(() => {
        getClientes().then(setClientes);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCliente(nuevoCliente);
        setClientes(await getClientes());
    };

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>{cliente.nombre} - {cliente.email}</li>
                ))}
            </ul>

            <h3>Agregar Cliente</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} />
                <input type="email" placeholder="Email" onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })} />
                <input type="text" placeholder="Teléfono" onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })} />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}
