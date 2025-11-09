import React, { useState, useEffect, useCallback } from 'react';
// Firebase Imports for React environment
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
