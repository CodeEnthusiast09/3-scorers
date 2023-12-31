import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/3-scorer-logo.png";
import { Link } from "react-router-dom";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.png";
import img6 from "../images/img6.png";

const randomImages = [img1, img2, img3, img4, img5, img6];

export default function Overview() {
  const getToken = localStorage.getItem("token"); // Get the stored token

  // console.log(getToken);
  const [userList, setUserList] = useState([]);
  const [No_of_users, setUserCount] = useState(0);
  const [No_of_admins, setAdminCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the list of users using the auth token
    if (getToken) {
      fetch("https://test.3scorers.com/api/v1/admin/get-users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("API response:", data);
          if (data.success) {
            setUserList(data.data);
          } else {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
    if (userList.length > 0) {
      const users = userList.filter((user) => user.role === "user");
      const admins = userList.filter((user) => user.role === "admin");
      setUserCount(users.length);
      setAdminCount(admins.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken, navigate ,userList.length]);

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  return (
    <div className="overview">
      <div className="sidebar">
        <img className="scorers-logo" src={logo} alt="3-scorers-logo" />
        <nav className="menu">
          <Link to="/overview">
            <li className="current">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="ic:baseline-dashboard">
                  <path
                    id="Vector"
                    d="M3 11.8889H10.1111V3H3V11.8889ZM3 19H10.1111V13.6667H3V19ZM11.8889 19H19V10.1111H11.8889V19ZM11.8889 3V8.33333H19V3H11.8889Z"
                    fill=""
                  />
                </g>
              </svg>
              <p>Overview</p>
            </li>
          </Link>
          <Link to="/users">
            <li className="users">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="users / 24 / Outline">
                  <path
                    id="Vector"
                    d="M12.5758 12.22C13.1093 11.7581 13.5373 11.1869 13.8306 10.545C14.124 9.90316 14.2758 9.20571 14.2758 8.5C14.2758 7.17392 13.749 5.90215 12.8113 4.96447C11.8736 4.02678 10.6018 3.5 9.27576 3.5C7.94967 3.5 6.67791 4.02678 5.74022 4.96447C4.80254 5.90215 4.27576 7.17392 4.27576 8.5C4.27575 9.20571 4.42756 9.90316 4.72088 10.545C5.01421 11.1869 5.44218 11.7581 5.97576 12.22C4.5759 12.8539 3.38822 13.8775 2.55474 15.1685C1.72125 16.4596 1.27723 17.9633 1.27576 19.5C1.27576 19.7652 1.38111 20.0196 1.56865 20.2071C1.75619 20.3946 2.01054 20.5 2.27576 20.5C2.54097 20.5 2.79533 20.3946 2.98286 20.2071C3.1704 20.0196 3.27576 19.7652 3.27576 19.5C3.27576 17.9087 3.9079 16.3826 5.03312 15.2574C6.15833 14.1321 7.68446 13.5 9.27576 13.5C10.8671 13.5 12.3932 14.1321 13.5184 15.2574C14.6436 16.3826 15.2758 17.9087 15.2758 19.5C15.2758 19.7652 15.3811 20.0196 15.5687 20.2071C15.7562 20.3946 16.0105 20.5 16.2758 20.5C16.541 20.5 16.7953 20.3946 16.9829 20.2071C17.1704 20.0196 17.2758 19.7652 17.2758 19.5C17.2743 17.9633 16.8303 16.4596 15.9968 15.1685C15.1633 13.8775 13.9756 12.8539 12.5758 12.22ZM9.27576 11.5C8.68241 11.5 8.10239 11.3241 7.60905 10.9944C7.1157 10.6648 6.73118 10.1962 6.50412 9.64805C6.27706 9.09987 6.21765 8.49667 6.3334 7.91473C6.44916 7.33279 6.73488 6.79824 7.15444 6.37868C7.57399 5.95912 8.10854 5.6734 8.69049 5.55764C9.27243 5.44189 9.87563 5.5013 10.4238 5.72836C10.972 5.95542 11.4405 6.33994 11.7702 6.83329C12.0998 7.32664 12.2758 7.90666 12.2758 8.5C12.2758 9.29565 11.9597 10.0587 11.3971 10.6213C10.8345 11.1839 10.0714 11.5 9.27576 11.5ZM19.0158 11.82C19.6557 11.0993 20.0738 10.2091 20.2196 9.25634C20.3654 8.30362 20.2327 7.32907 19.8375 6.45C19.4424 5.57093 18.8015 4.8248 17.9922 4.30142C17.1829 3.77805 16.2396 3.49974 15.2758 3.5C15.0105 3.5 14.7562 3.60536 14.5687 3.79289C14.3811 3.98043 14.2758 4.23478 14.2758 4.5C14.2758 4.76522 14.3811 5.01957 14.5687 5.20711C14.7562 5.39464 15.0105 5.5 15.2758 5.5C16.0714 5.5 16.8345 5.81607 17.3971 6.37868C17.9597 6.94129 18.2758 7.70435 18.2758 8.5C18.2743 9.02524 18.1351 9.5409 17.8718 9.99542C17.6086 10.4499 17.2306 10.8274 16.7758 11.09C16.6275 11.1755 16.5037 11.2977 16.4161 11.4447C16.3286 11.5918 16.2802 11.7589 16.2758 11.93C16.2716 12.0998 16.3107 12.2678 16.3894 12.4183C16.4681 12.5687 16.5839 12.6967 16.7258 12.79L17.1158 13.05L17.2458 13.12C18.4512 13.6917 19.4681 14.596 20.1767 15.7263C20.8854 16.8566 21.2563 18.1659 21.2458 19.5C21.2458 19.7652 21.3511 20.0196 21.5387 20.2071C21.7262 20.3946 21.9805 20.5 22.2458 20.5C22.511 20.5 22.7653 20.3946 22.9529 20.2071C23.1404 20.0196 23.2458 19.7652 23.2458 19.5C23.2539 17.9654 22.8696 16.4543 22.1292 15.1101C21.3889 13.7659 20.3171 12.6333 19.0158 11.82Z"
                    fill="white"
                  />
                </g>
              </svg>
              <p>Users</p>
            </li>
          </Link>
          <Link to="/admins">
            <li className="admins">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="User Arrows/ 24 / Solid">
                  <path
                    id="Vector"
                    d="M6.87576 6.9C6.87576 7 6.97576 7.1 7.07576 7.2L9.07576 9.2C9.27576 9.4 9.47576 9.5 9.77576 9.5C10.0758 9.5 10.2758 9.4 10.4758 9.2C10.8758 8.8 10.8758 8.2 10.4758 7.8L10.1758 7.5H14.3758L14.0758 7.8C13.8758 8 13.7758 8.2 13.7758 8.5C13.7758 9.1 14.1758 9.5 14.7758 9.5C15.0758 9.5 15.2758 9.4 15.4758 9.2L17.4758 7.2C17.5758 7.1 17.6758 7 17.6758 6.9C17.6758 6.8 17.7758 6.7 17.7758 6.5C17.7758 6.4 17.7758 6.2 17.6758 6.1C17.5758 6 17.5758 5.9 17.4758 5.8L15.4758 3.8C15.0758 3.4 14.4758 3.4 14.0758 3.8C13.6758 4.2 13.6758 4.8 14.0758 5.2L14.3758 5.5H10.1758L10.4758 5.2C10.8758 4.8 10.8758 4.2 10.4758 3.8C10.0758 3.4 9.47576 3.4 9.07576 3.8L7.07576 5.8C6.97576 5.9 6.87576 6 6.87576 6.1C6.87576 6.2 6.77576 6.3 6.77576 6.5C6.77576 6.6 6.77576 6.8 6.87576 6.9ZM6.27576 14.7C7.67576 14.7 8.87576 13.5 8.87576 12.1C8.87576 10.7 7.67576 9.5 6.27576 9.5C4.87576 9.5 3.67576 10.7 3.67576 12.1C3.67576 13.5 4.87576 14.7 6.27576 14.7ZM10.0758 17.4C7.47576 15.3 3.67576 15.7 1.57576 18.3C1.37576 18.6 1.27576 18.9 1.27576 19.2C1.27576 19.9 1.87576 20.5 2.57576 20.5H9.97576C10.4758 20.5 10.9758 20.2 11.1758 19.8C11.3758 19.4 11.3758 18.8 10.9758 18.4C10.6758 18 10.3758 17.7 10.0758 17.4ZM15.6758 12.1C15.6758 13.5 16.8758 14.7 18.2758 14.7C19.6758 14.7 20.8758 13.5 20.8758 12.1C20.8758 10.7 19.6758 9.5 18.2758 9.5C16.8758 9.5 15.6758 10.7 15.6758 12.1ZM22.9758 18.4C22.6758 18.1 22.3758 17.7 22.0758 17.5C19.4758 15.4 15.6758 15.8 13.5758 18.4C13.3758 18.6 13.2758 18.9 13.2758 19.2C13.2758 19.9 13.8758 20.5 14.5758 20.5H21.9758C22.4758 20.5 22.9758 20.2 23.1758 19.8C23.3758 19.3 23.2758 18.8 22.9758 18.4Z"
                    fill="white"
                  />
                </g>
              </svg>

              <p>Admins</p>
            </li>
          </Link>
          <Link to="/login">
            <li className="logout">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="User Interface / Logout">
                  <path
                    id="Vector"
                    d="M4.27576 12C4.27576 12.2652 4.38111 12.5196 4.56865 12.7071C4.75619 12.8946 5.01054 13 5.27576 13H12.8658L10.5658 15.29C10.472 15.383 10.3976 15.4936 10.3469 15.6154C10.2961 15.7373 10.27 15.868 10.27 16C10.27 16.132 10.2961 16.2627 10.3469 16.3846C10.3976 16.5064 10.472 16.617 10.5658 16.71C10.6587 16.8037 10.7693 16.8781 10.8912 16.9289C11.013 16.9797 11.1437 17.0058 11.2758 17.0058C11.4078 17.0058 11.5385 16.9797 11.6603 16.9289C11.7822 16.8781 11.8928 16.8037 11.9858 16.71L15.9858 12.71C16.0768 12.6149 16.1482 12.5028 16.1958 12.38C16.2958 12.1365 16.2958 11.8635 16.1958 11.62C16.1482 11.4972 16.0768 11.3851 15.9858 11.29L11.9858 7.29C11.8925 7.19676 11.7818 7.1228 11.66 7.07234C11.5382 7.02188 11.4076 6.99591 11.2758 6.99591C11.1439 6.99591 11.0133 7.02188 10.8915 7.07234C10.7697 7.1228 10.659 7.19676 10.5658 7.29C10.4725 7.38324 10.3986 7.49393 10.3481 7.61575C10.2976 7.73757 10.2717 7.86814 10.2717 8C10.2717 8.13186 10.2976 8.26243 10.3481 8.38425C10.3986 8.50607 10.4725 8.61676 10.5658 8.71L12.8658 11H5.27576C5.01054 11 4.75619 11.1054 4.56865 11.2929C4.38111 11.4804 4.27576 11.7348 4.27576 12ZM17.2758 2H7.27576C6.48011 2 5.71705 2.31607 5.15444 2.87868C4.59183 3.44129 4.27576 4.20435 4.27576 5V8C4.27576 8.26522 4.38111 8.51957 4.56865 8.70711C4.75619 8.89464 5.01054 9 5.27576 9C5.54097 9 5.79533 8.89464 5.98286 8.70711C6.1704 8.51957 6.27576 8.26522 6.27576 8V5C6.27576 4.73478 6.38111 4.48043 6.56865 4.29289C6.75619 4.10536 7.01054 4 7.27576 4H17.2758C17.541 4 17.7953 4.10536 17.9829 4.29289C18.1704 4.48043 18.2758 4.73478 18.2758 5V19C18.2758 19.2652 18.1704 19.5196 17.9829 19.7071C17.7953 19.8946 17.541 20 17.2758 20H7.27576C7.01054 20 6.75619 19.8946 6.56865 19.7071C6.38111 19.5196 6.27576 19.2652 6.27576 19V16C6.27576 15.7348 6.1704 15.4804 5.98286 15.2929C5.79533 15.1054 5.54097 15 5.27576 15C5.01054 15 4.75619 15.1054 4.56865 15.2929C4.38111 15.4804 4.27576 15.7348 4.27576 16V19C4.27576 19.7956 4.59183 20.5587 5.15444 21.1213C5.71705 21.6839 6.48011 22 7.27576 22H17.2758C18.0714 22 18.8345 21.6839 19.3971 21.1213C19.9597 20.5587 20.2758 19.7956 20.2758 19V5C20.2758 4.20435 19.9597 3.44129 19.3971 2.87868C18.8345 2.31607 18.0714 2 17.2758 2Z"
                    fill="white"
                  />
                </g>
              </svg>

              <p>Logout</p>
            </li>
          </Link>
        </nav>
      </div>
      <div className="overview-page">
        <header>
          <h2>Overview</h2>
          <div className="Admin">
            <h4>Rex Stephen</h4>
            <p>Administrator</p>
          </div>
        </header>
        <div className="cards">
          <div className="card-1">
            <div className="card-1-text">
              <p>TOTAL NUMBER OF USERS</p>
              <h1>{No_of_users}</h1>
            </div>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="users / 24 / Outline">
                <path
                  id="Vector"
                  d="M12.5758 12.22C13.1093 11.7581 13.5373 11.1869 13.8306 10.545C14.124 9.90316 14.2758 9.20571 14.2758 8.5C14.2758 7.17392 13.749 5.90215 12.8113 4.96447C11.8736 4.02678 10.6018 3.5 9.27576 3.5C7.94967 3.5 6.67791 4.02678 5.74022 4.96447C4.80254 5.90215 4.27576 7.17392 4.27576 8.5C4.27575 9.20571 4.42756 9.90316 4.72088 10.545C5.01421 11.1869 5.44218 11.7581 5.97576 12.22C4.5759 12.8539 3.38822 13.8775 2.55474 15.1685C1.72125 16.4596 1.27723 17.9633 1.27576 19.5C1.27576 19.7652 1.38111 20.0196 1.56865 20.2071C1.75619 20.3946 2.01054 20.5 2.27576 20.5C2.54097 20.5 2.79533 20.3946 2.98286 20.2071C3.1704 20.0196 3.27576 19.7652 3.27576 19.5C3.27576 17.9087 3.9079 16.3826 5.03312 15.2574C6.15833 14.1321 7.68446 13.5 9.27576 13.5C10.8671 13.5 12.3932 14.1321 13.5184 15.2574C14.6436 16.3826 15.2758 17.9087 15.2758 19.5C15.2758 19.7652 15.3811 20.0196 15.5687 20.2071C15.7562 20.3946 16.0105 20.5 16.2758 20.5C16.541 20.5 16.7953 20.3946 16.9829 20.2071C17.1704 20.0196 17.2758 19.7652 17.2758 19.5C17.2743 17.9633 16.8303 16.4596 15.9968 15.1685C15.1633 13.8775 13.9756 12.8539 12.5758 12.22ZM9.27576 11.5C8.68241 11.5 8.10239 11.3241 7.60905 10.9944C7.1157 10.6648 6.73118 10.1962 6.50412 9.64805C6.27706 9.09987 6.21765 8.49667 6.3334 7.91473C6.44916 7.33279 6.73488 6.79824 7.15444 6.37868C7.57399 5.95912 8.10854 5.6734 8.69049 5.55764C9.27243 5.44189 9.87563 5.5013 10.4238 5.72836C10.972 5.95542 11.4405 6.33994 11.7702 6.83329C12.0998 7.32664 12.2758 7.90666 12.2758 8.5C12.2758 9.29565 11.9597 10.0587 11.3971 10.6213C10.8345 11.1839 10.0714 11.5 9.27576 11.5ZM19.0158 11.82C19.6557 11.0993 20.0738 10.2091 20.2196 9.25634C20.3654 8.30362 20.2327 7.32907 19.8375 6.45C19.4424 5.57093 18.8015 4.8248 17.9922 4.30142C17.1829 3.77805 16.2396 3.49974 15.2758 3.5C15.0105 3.5 14.7562 3.60536 14.5687 3.79289C14.3811 3.98043 14.2758 4.23478 14.2758 4.5C14.2758 4.76522 14.3811 5.01957 14.5687 5.20711C14.7562 5.39464 15.0105 5.5 15.2758 5.5C16.0714 5.5 16.8345 5.81607 17.3971 6.37868C17.9597 6.94129 18.2758 7.70435 18.2758 8.5C18.2743 9.02524 18.1351 9.5409 17.8718 9.99542C17.6086 10.4499 17.2306 10.8274 16.7758 11.09C16.6275 11.1755 16.5037 11.2977 16.4161 11.4447C16.3286 11.5918 16.2802 11.7589 16.2758 11.93C16.2716 12.0998 16.3107 12.2678 16.3894 12.4183C16.4681 12.5687 16.5839 12.6967 16.7258 12.79L17.1158 13.05L17.2458 13.12C18.4512 13.6917 19.4681 14.596 20.1767 15.7263C20.8854 16.8566 21.2563 18.1659 21.2458 19.5C21.2458 19.7652 21.3511 20.0196 21.5387 20.2071C21.7262 20.3946 21.9805 20.5 22.2458 20.5C22.511 20.5 22.7653 20.3946 22.9529 20.2071C23.1404 20.0196 23.2458 19.7652 23.2458 19.5C23.2539 17.9654 22.8696 16.4543 22.1292 15.1101C21.3889 13.7659 20.3171 12.6333 19.0158 11.82Z"
                  fill="#004F4F"
                />
              </g>
            </svg>
          </div>
          <div className="card-2">
            <div className="card-2-text">
              <p>TOTAL NUMBER OF ADMINS</p>
              <h1>{No_of_admins}</h1>
            </div>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="User Arrows/ 24 / Solid">
                <path
                  id="Vector"
                  d="M6.87576 6.9C6.87576 7 6.97576 7.1 7.07576 7.2L9.07576 9.2C9.27576 9.4 9.47576 9.5 9.77576 9.5C10.0758 9.5 10.2758 9.4 10.4758 9.2C10.8758 8.8 10.8758 8.2 10.4758 7.8L10.1758 7.5H14.3758L14.0758 7.8C13.8758 8 13.7758 8.2 13.7758 8.5C13.7758 9.1 14.1758 9.5 14.7758 9.5C15.0758 9.5 15.2758 9.4 15.4758 9.2L17.4758 7.2C17.5758 7.1 17.6758 7 17.6758 6.9C17.6758 6.8 17.7758 6.7 17.7758 6.5C17.7758 6.4 17.7758 6.2 17.6758 6.1C17.5758 6 17.5758 5.9 17.4758 5.8L15.4758 3.8C15.0758 3.4 14.4758 3.4 14.0758 3.8C13.6758 4.2 13.6758 4.8 14.0758 5.2L14.3758 5.5H10.1758L10.4758 5.2C10.8758 4.8 10.8758 4.2 10.4758 3.8C10.0758 3.4 9.47576 3.4 9.07576 3.8L7.07576 5.8C6.97576 5.9 6.87576 6 6.87576 6.1C6.87576 6.2 6.77576 6.3 6.77576 6.5C6.77576 6.6 6.77576 6.8 6.87576 6.9ZM6.27576 14.7C7.67576 14.7 8.87576 13.5 8.87576 12.1C8.87576 10.7 7.67576 9.5 6.27576 9.5C4.87576 9.5 3.67576 10.7 3.67576 12.1C3.67576 13.5 4.87576 14.7 6.27576 14.7ZM10.0758 17.4C7.47576 15.3 3.67576 15.7 1.57576 18.3C1.37576 18.6 1.27576 18.9 1.27576 19.2C1.27576 19.9 1.87576 20.5 2.57576 20.5H9.97576C10.4758 20.5 10.9758 20.2 11.1758 19.8C11.3758 19.4 11.3758 18.8 10.9758 18.4C10.6758 18 10.3758 17.7 10.0758 17.4ZM15.6758 12.1C15.6758 13.5 16.8758 14.7 18.2758 14.7C19.6758 14.7 20.8758 13.5 20.8758 12.1C20.8758 10.7 19.6758 9.5 18.2758 9.5C16.8758 9.5 15.6758 10.7 15.6758 12.1ZM22.9758 18.4C22.6758 18.1 22.3758 17.7 22.0758 17.5C19.4758 15.4 15.6758 15.8 13.5758 18.4C13.3758 18.6 13.2758 18.9 13.2758 19.2C13.2758 19.9 13.8758 20.5 14.5758 20.5H21.9758C22.4758 20.5 22.9758 20.2 23.1758 19.8C23.3758 19.3 23.2758 18.8 22.9758 18.4Z"
                  fill="#007575"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="list-card">
          {/* List of Users */}

          <div className="userList">
            <h3>List Of Users</h3>
            <div className="users-list">
              {userList
                .filter((user) => user.role === "user")
                .map((adminUser) => (
                  <div className="user-activity" key={adminUser.id}>
                    <div className="profile">
                      <img src={getRandomImage()} alt={adminUser.firstName} />
                      <p className="user-name">
                        {adminUser.firstName} {adminUser.lastName}
                      </p>
                    </div>
                    <a href="##">
                      <p className="details">View details</p>
                    </a>
                  </div>
                ))}
            </div>
          </div>

          {/* List of Admins */}

          <div className="adminList">
            <h3>List Of Admins</h3>
            <div className="admins-list">
              {userList
                .filter((user) => user.role === "admin")
                .map((adminUser) => (
                  <div className="user-activity" key={adminUser.id}>
                    <div className="profile">
                      <img src={getRandomImage()} alt={adminUser.firstName} />
                      <p className="user-name">
                        {adminUser.firstName} {adminUser.lastName}
                      </p>
                    </div>
                    <a href="##">
                      <p className="details">View details</p>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
