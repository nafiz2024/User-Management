
const UsersPage = async () => {
    const res = await fetch('http://localhost:8000/users');
    const users = await res.json();

    return (
        <div>
            <h1>Users: </h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}, {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;