import React from "react";
import ForbiddenContent from "../forbidden/Forbedden";
import "./profile-style.css";
import { IoMdClose } from "react-icons/io";
const Profile = () => {
  const token = localStorage.getItem("token"); 


  const content = token ? (
    <section className="settings-container">
      <div className="table-data-profile">
        <div className="close-div">
          <IoMdClose
            style={{
              position: "relative",
              right: 20 + "px",
              cursor: "pointer",
            }}
            onClick={() => {
              document.querySelector(".user-setting").classList.remove("show");
            }}
          />
        </div>
        <div className="order">
          <div className="setting-div">
            <h3>Dane osobowe</h3>
            <form id="settingsForm">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Imię</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Twoje imię"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Nazwisko</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Twoje nazwisko"
                  />
                </div>
              </div>
            </form>
          </div>

          <hr />
          <div className="setting-div">
            <h3>Konto</h3>
            <form id="settingsForm">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Twój email"
                />
              </div>

              <div class="form-group">
                <label for="password">Nowe hasło</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                />
              </div>

              <div class="form-group">
                <label for="password">Powtórz nowe hasło</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                />
              </div>

              <div class="form-group">
                <label for="avatar">Zmień zdjecie profilowe</label>
                <input type="file" id="avatar" name="avatar" accept="image/*" />

                <label for="avatar-preview">Podgląd zdjecia</label>
                <div className="profile-image-settings">
                  <img src="" id="new-picture" />
                </div>
              </div>
            </form>
          </div>
          <hr />
          <button type="submit" class="save-btn">
            Zapisz zmiany
          </button>
        </div>
      </div>
      <div></div>
    </section>
  ) : (
    <ForbiddenContent />
  );
  return content;
};

export default Profile;
