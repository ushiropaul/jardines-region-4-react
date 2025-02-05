import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import {
    updateProfile,
    updatePassword,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';
import './MyAccount.css';
import LogOutBtn from './../../components/LogOutBtn/LogOutBtn';
import Alert from '../../components/Alert/Alert';

function MyAccount() {
    const { user } = useAuth();
    const [firstName, setFirstName] = useState(user?.displayName?.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.displayName?.split(' ')[1] || '');
    const [email] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [category, setCategory] = useState(''); // Estado para la categoría
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const translateError = (errorCode) => {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'La contraseña actual es incorrecta.';
            case 'auth/weak-password':
                return 'La nueva contraseña es muy débil. Por favor, elige una contraseña más segura.';
            case 'auth/requires-recent-login':
                return 'Por razones de seguridad, debes iniciar sesión nuevamente para realizar esta acción.';
            case 'auth/user-not-found':
                return 'Usuario no encontrado. Por favor, verifica tu información.';
            case 'auth/missing-password':
                return 'La contraseña actual es requerida para esta acción.';
            default:
                return 'Ocurrió un error inesperado. Intenta nuevamente más tarde.';
        }
    };

    const translateSuccessMessage = (messageCode) => {
        switch (messageCode) {
            case 'password-changed':
                return 'La contraseña se cambió exitosamente.';
            case 'account-deleted':
                return 'La cuenta se eliminó exitosamente.';
            case 'profile-updated':
                return 'Sus datos se actualizaron correctamente.';
            default:
                return 'Operación completada con éxito.';
        }
    };

    const reauthenticate = async (currentPassword) => {
        setError('');
        setSuccessMessage('');
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
        } catch (error) {
            throw new Error(translateError(error.code));
        }
    };

    const handleChangePassword = async () => {
        setError('');
        setSuccessMessage('');
        try {
            await reauthenticate(password);
            await updatePassword(user, newPassword);
            setSuccessMessage(translateSuccessMessage('password-changed'));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteAccount = async () => {
        setError('');
        setSuccessMessage('');
        try {
            await reauthenticate(password);
            await deleteUser(user);
            setSuccessMessage(translateSuccessMessage('account-deleted'));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSave = async () => {
        setError('');
        setSuccessMessage('');
        try {
            const newDisplayName = `${firstName} ${lastName}`;
            await updateProfile(user, { displayName: newDisplayName });

            // Guardar la categoría en una base de datos si aplica
            if (category) {
                // Aquí puedes usar Firestore o cualquier base de datos.
                // Ejemplo con Firestore:
                // const userRef = doc(db, 'users', user.uid);
                // await updateDoc(userRef, { category });
            }

            setIsEditing(false);
            setSuccessMessage(translateSuccessMessage('profile-updated'));
        } catch (error) {
            setError(translateError(error.code));
        }
    };

    return (
        <main className="mainAccount">
            <div className="headerAccount">
                <p className="text-xl">{user?.displayName}</p>
                <LogOutBtn />
            </div>
            {error && <Alert message={error} type="error" />}
            {successMessage && <Alert message={successMessage} type="success" />}
            <div className="accountDetails">
                <h2>Mis Datos</h2>
                <div className="formField">
                    <label>Email:</label>
                    <p>{email}</p>
                </div>
                <div className="formField">
                    <label>Nombre:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    ) : (
                        <p>{firstName}</p>
                    )}
                </div>
                <div className="formField">
                    <label>Apellido:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    ) : (
                        <p>{lastName}</p>
                    )}
                </div>
                <div className="formActions">
                    {isEditing ? (
                        <button onClick={handleSave}>Guardar</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Editar</button>
                    )}
                </div>
                <div className="formField">
                    <label>Contraseña Actual:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="formField">
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="optionButtons">
                    <button onClick={handleChangePassword}>Cambiar Contraseña</button>
                    <button onClick={handleDeleteAccount}>Borrar Cuenta</button>
                </div>
            </div>
        </main>
    );
}

export default MyAccount;
