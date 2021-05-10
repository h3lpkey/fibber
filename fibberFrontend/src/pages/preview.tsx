import React, { ReactElement } from "react";
import Header from "components/Header";
import "assets/sass/main.sass";
import Logo from "assets/images/logo.svg";

function PreviewPage(): ReactElement {
  return (
    <>
      <Header />
      <div className="page page-home">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="title">Время охуительных историй</h1>
        <p className="description">
          Гарри услышал ее удаляющиеся шаги, а затем до него донесся звук плюхнувшейся на плиту
          сковородки.Он перевернулся на спину и попытался вспомнить, что же ему снилось.
        </p>
        <button
          className="button-default button-default-big"
          onClick={() => {
            const link = `/quest/0`;
            window.location.href = link;
          }}>
          Начать игру
        </button>
        <button className="button-default">Начать заново</button>
        <button className="button-default">Выйти из игры</button>
      </div>
    </>
  );
}

export default PreviewPage;
