import React from "react";
import ForbiddenContent from "../forbidden/Forbedden";
import './profile-style.css'

const Profile = () =>{

        const userData = JSON.parse(window.localStorage.getItem("userData"))
        let emailFromCookie = document.cookie.substr(6)

        const content = emailFromCookie === userData.email || userData.email != undefined 
        ? 
        
              <section className="settings-container">
                    <div className="table-data-profile">
                        <div className="head">
                            <h3>Ustawienia</h3>
                            <i className='bx bx-search' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <div className="order">
                        <div className="setting-div">
                            <h3>Dane osobowe</h3>
                            <form id="settingsForm">
                                <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Imię</label>
                                    <input type="text" id="name" name="name" placeholder="Twoje imię" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastname">Nazwisko</label>
                                    <input type="text" id="lastname" name="lastname" placeholder="Twoje nazwisko" />
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
                                <input type="email" id="email" name="email" placeholder="Twój email" />
                            </div>

                            <div class="form-group">
                                <label for="password">Nowe hasło</label>
                                <input type="password" id="password" name="password" placeholder="••••••••" />
                            </div>

                            <div class="form-group">
                                <label for="password">Powtórz nowe hasło</label>
                                <input type="password" id="password" name="password" placeholder="••••••••" />
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
                        <button type="submit" class="save-btn">Zapisz zmiany</button>
                        </div>
                    </div>
                    <div>

                    </div>
            </section>
        : 
        <ForbiddenContent />
    return(
        content
    )

}

export default Profile

