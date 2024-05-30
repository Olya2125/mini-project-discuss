"use client"

import React from 'react';
import styles from "@/components/styles.module.css";

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button className={styles.btnback} onClick={goBack}>&#8249;  Back</button>
  );
};

export default BackButton;

