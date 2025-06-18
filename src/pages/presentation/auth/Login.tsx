import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo'
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import USERS, { getUserDataWithUsername } from '../../../common/data/usernishadummydata';
import Spinner from '../../../components/bootstrap/Spinner';

// Add your illustration image to your assets and import here
const illustration = "/hy.png";

interface ILoginHeaderProps {
    isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => (
    <>
        <div className="d-flex justify-content-center mb-3">
            <Logo width={80} />
        </div>
        <div className='text-center h1 fw-bold mt-2 mb-1'>
            {isNewUser ? 'Create Account,' : 'Welcome,'}
        </div>
        <div className='text-center h5 text-muted mb-4'>
            {isNewUser ? 'Sign up to get started!' : 'Sign in to continue!'}
        </div>
    </>
);

interface ILoginProps {
    isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
    const { setUser } = useContext(AuthContext);
    const { darkModeStatus } = useDarkMode();

    const [signInPassword, setSignInPassword] = useState<boolean>(false);
    const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);

    const [signupEmail, setSignupEmail] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupSurname, setSignupSurname] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signups, setSignups] = useState<any[]>([]);
    const [jsonUsers, setJsonUsers] = useState<any[]>([]);
    const [addEmployeeUsers, setAddEmployeeUsers] = useState<any[]>([]);
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/'), [navigate]);

    // Fetch users from json-server on mount
    React.useEffect(() => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => setJsonUsers(data))
            .catch(() => setJsonUsers([]));
    }, []);

    // Fetch AddEmployee users on mount
    React.useEffect(() => {
        fetch('http://localhost:4000/AddEmployee')
            .then(res => res.json())
            .then(data => {
                // If data is an array, use it directly; if it's an object, use .AddEmployee
                if (Array.isArray(data)) {
                    setAddEmployeeUsers(data);
                } else if (data.AddEmployee) {
                    setAddEmployeeUsers(data.AddEmployee);
                } else {
                    setAddEmployeeUsers([]);
                }
            })
            .catch(() => setAddEmployeeUsers([]));
    }, []);

    console.log(addEmployeeUsers)

    const usernameCheck = (username: string) => {
        // Check dummy data
        if (getUserDataWithUsername(username)) return true;
        // Check json-server users
        if (jsonUsers.some(user => user.email === username || user.name === username)) return true;
        // Check AddEmployee users
        return addEmployeeUsers.some(
            user =>
                user.email === username ||
                user.name === username ||
                user.employeeEmail === username ||
                user.employeeName === username
        );
    };

    const passwordCheck = (username: string, password: string) => {
        // Check dummy data
        const dummyUser = getUserDataWithUsername(username);
        if (dummyUser && dummyUser.password === password) return true;

        // Check json-server users
        const jsonUser = jsonUsers.find(
            user => user.email === username || user.name === username
        );
        if (jsonUser && jsonUser.password === password) return true;

        // Check AddEmployee users
        const addEmpUser = addEmployeeUsers.find(
            user =>
                user.email === username ||
                user.name === username ||
                user.employeeEmail === username ||
                user.employeeName === username
        );
        if (addEmpUser && addEmpUser.password === password) return true;

        return false;
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            loginUsername: USERS.NISHA.username,
            loginPassword: USERS.NISHA.password,
        },
        validate: (values) => {
            const errors: { loginUsername?: string; loginPassword?: string } = {};
            if (!values.loginUsername) errors.loginUsername = 'Required';
            if (!values.loginPassword) errors.loginPassword = 'Required';
            return errors;
        },
        validateOnChange: false,
        onSubmit: (values) => {
            if (usernameCheck(values.loginUsername)) {
                if (passwordCheck(values.loginUsername, values.loginPassword)) {
                    // After successful login
                    const user =
                        getUserDataWithUsername(values.loginUsername) ||
                        jsonUsers.find(
                            user => user.email === values.loginUsername || user.name === values.loginUsername
                        ) ||
                        addEmployeeUsers.find(
                            user =>
                                user.email === values.loginUsername ||
                                user.name === values.loginUsername ||
                                user.employeeEmail === values.loginUsername ||
                                user.employeeName === values.loginUsername
                        );
                    if (user) {
                        // Prefer user.id, fallback to user.employeeId
                        const userId = user.id?.toString() || user.employeeId?.toString();
                        if (userId && userId !== 'undefined' && userId !== 'null' && userId !== '') {
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            localStorage.setItem('currentUserId', userId);
                            if (setUser) setUser(values.loginUsername);
                            // OLD: navigate(`/appointment/employee/${userId}`);
                            navigate('/'); // <-- Go to dashboard after login
                        } else {
                            formik.setFieldError('loginUsername', 'User does not have a valid ID.');
        handleOnClick();
    }
}
                } else {
                    formik.setFieldError('loginPassword', 'Username and password do not match.');
                }
            } else {
                formik.setFieldError('loginUsername', 'No such user found in the system.');
            }
        },
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleContinue = () => {
        setIsLoading(true);
        setTimeout(() => {
            const username = formik.values.loginUsername;
            // Check dummy data
            const dummyExists = Object.keys(USERS).find(
                (f) => USERS[f].username.toString() === username
            );
            // Check json-server users
            const jsonExists = jsonUsers.some(
                user => user.email === username || user.name === username
            );
            // Check AddEmployee users
            const addEmpExists = addEmployeeUsers.some(
                user =>
                    user.email === username ||
                    user.name === username ||
                    user.employeeEmail === username ||
                    user.employeeName === username
            );
            if (!dummyExists && !jsonExists && !addEmpExists) {
                formik.setFieldError('loginUsername', 'No such user found in the system.');
            } else {
                setSignInPassword(true);
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleSignup = async (e: React.MouseEvent) => {
        e.preventDefault();
        const signupData = {
            email: signupEmail,
            name: signupName,
            surname: signupSurname,
            password: signupPassword,
        };

        // Save locally for display (optional)
        setSignups(prev => [...prev, signupData]);
        setSignupEmail('');
        setSignupName('');
        setSignupSurname('');
        setSignupPassword('');

        // Send to json-server
        try {
            const response = await fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });
            if (!response.ok) {
                throw new Error('Failed to save user');
            }
            alert('Sign up successful! You can now log in.');
            setSingUpStatus(false);
        } catch (error) {
            alert('Error saving signup: ' + error);
        }
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="row g-0 min-vh-100">
                {/* Left Side - Illustration */}
                <div
                    className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center"
                    style={{
                        background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
                        position: 'relative',
                    }}
                >
                    <img
                        src={illustration}
                        alt="Login Illustration"
                        style={{ maxWidth: '70%', marginBottom: 40 }}
                    />
                    {/* Optionally add floating icons or text here */}
                    <div style={{ position: 'absolute', top: 30, right: 40 }}>
                        <Logo width={120} />
                    </div>
                </div>
                {/* Right Side - Login Form */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center bg-white" style={{ minHeight: '100vh' }}>
                    <div style={{ width: '100%', maxWidth: 420, padding: '2.5rem 2rem', boxShadow: '0 0 32px 0 rgba(0,0,0,0.08)', borderRadius: 16 }}>
                        <LoginHeader isNewUser={singUpStatus} />
                        <form className="row g-4">
                            {singUpStatus ? (
                                <>
                                    <div className="col-12">
                                        <FormGroup id="signup-email" isFloating label="Your email">
                                            <Input
                                                type="email"
                                                autoComplete="email"
                                                value={signupEmail}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupEmail(e.target.value)}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col-12">
                                        <FormGroup id="signup-name" isFloating label="Your name">
                                            <Input
                                                autoComplete="given-name"
                                                value={signupName}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupName(e.target.value)}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col-12">
                                        <FormGroup id="signup-surname" isFloating label="Your surname">
                                            <Input
                                                autoComplete="family-name"
                                                value={signupSurname}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupSurname(e.target.value)}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col-12">
                                        <FormGroup id="signup-password" isFloating label="Password">
                                            <Input
                                                type="password"
                                                autoComplete="password"
                                                value={signupPassword}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignupPassword(e.target.value)}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col-12">
                                        <Button color="info" className="w-100 py-3" onClick={handleSignup} style={{ background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)', border: 'none' }}>
                                            Sign Up
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-12">
                                        <FormGroup
                                            id="loginUsername"
                                            isFloating
                                            label="Your email or username"
                                            className={classNames({ 'd-none': signInPassword })}
                                        >
                                            <Input
                                                autoComplete="username"
                                                value={formik.values.loginUsername}
                                                isTouched={formik.touched.loginUsername}
                                                invalidFeedback={formik.errors.loginUsername}
                                                isValid={formik.isValid}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                onFocus={() => {
                                                    formik.setErrors({});
                                                }}
                                            />
                                        </FormGroup>
                                        {signInPassword && (
                                            <div className="text-center h4 mb-3 fw-bold">
                                                Hi, {formik.values.loginUsername}.
                                            </div>
                                        )}
                                        <FormGroup
                                            id="loginPassword"
                                            isFloating
                                            label="Password"
                                            className={classNames({ 'd-none': !signInPassword })}
                                        >
                                            <Input
                                                type="password"
                                                autoComplete="current-password"
                                                value={formik.values.loginPassword}
                                                isTouched={formik.touched.loginPassword}
                                                invalidFeedback={formik.errors.loginPassword}
                                                validFeedback="Looks good!"
                                                isValid={formik.isValid}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col-12">
                                        {!signInPassword ? (
                                            <Button
                                                color="primary"
                                                className="w-100 py-3"
                                                isDisable={!formik.values.loginUsername}
                                                onClick={handleContinue}
                                                style={{ background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)', border: 'none' }}
                                            >
                                                {isLoading && <Spinner isSmall inButton isGrow />}
                                                Continue
                                            </Button>
                                        ) : (
                                            <Button
                                                color="primary"
                                                className="w-100 py-3"
                                                onClick={formik.handleSubmit}
                                                style={{ background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)', border: 'none' }}
                                            >
                                                Login
                                            </Button>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="col-12 mt-2 text-center text-muted">OR</div>
                            <div className="col-12">
                                <Button
                                    isOutline
                                    color="dark"
                                    className="w-100 py-3 mb-2"
                                    icon="CustomGoogle"
                                    onClick={handleOnClick}
                                >
                                    Continue with Google
                                </Button>
                                <Button
                                    isOutline
                                    color="dark"
                                    className="w-100 py-3"
                                    icon="CustomApple"
                                    onClick={handleOnClick}
                                >
                                    Sign in with Apple
                                </Button>
                            </div>
                        </form>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <Button
                                color="link"
                                className="p-0"
                                onClick={() => setSingUpStatus(!singUpStatus)}
                            >
                                {singUpStatus ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                            </Button>
                            <Link to="/" className="text-decoration-none text-muted">
                                Privacy Policy
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
