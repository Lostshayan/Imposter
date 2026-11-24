'use client';

import React from 'react';
import { useSocketGame } from '../hooks/useSocketGame';
import { Header, TimerBar } from '../components/Header';
import { HomeScreen } from '../components/HomeScreen';
import { LobbyScreen } from '../components/LobbyScreen';
import { RoleRevealScreen } from '../components/RoleRevealScreen';
import { ClueInputScreen } from '../components/ClueInputScreen';
import { ClueShowcaseScreen } from '../components/ClueShowcaseScreen';
import { VotingScreen } from '../components/VotingScreen';
import { VoteResultsScreen } from '../components/VoteResultsScreen';
import { GameOverScreen } from '../components/GameOverScreen';
import { PWAInstallPrompt } from '../components/PWAInstallPrompt';

export default function ImposterGamePage() {
  const {
    isConnected,
    gameState,
    timeLeft,
    errorMsg,
    createRoom,
    joinRoom,
    addBot,
    removeBot,
    updateSettings,
    startGame,
    proceedToClues,
    submitClue,
    proceedToVoting,
    castVote,
    proceedAfterResults,
    playAgain,
    resetScores,
    leaveRoom,
  } = useSocketGame();

  const handleSoloPlay = (name: string, avatar: string, color: string) => {
    createRoom(name, avatar, color);
    // Add 3 AI bots automatically after room creation
    setTimeout(() => {
      addBot();
      setTimeout(() => {
        addBot();
        setTimeout(() => {
          addBot();
        }, 200);
      }, 200);
    }, 400);
  };

  // If not inside a room, show Home / Join / Create / Solo
  if (!gameState) {
    return (
      <>
        <HomeScreen
          onCreateRoom={createRoom}
          onJoinRoom={joinRoom}
          onSoloPlay={handleSoloPlay}
          errorMsg={errorMsg}
        />
        <PWAInstallPrompt />
      </>
    );
  }

  const currentPhase = gameState.phase;

  return (
    <div
      className={`min-h-screen min-h-[100dvh] bg-[#0c1017] text-slate-100 flex flex-col relative selection:bg-rose-500 selection:text-white transition-all duration-700 ${
        currentPhase === 'GAME_OVER'
          ? gameState.winner === 'CIVILIANS'
            ? 'shadow-[inset_0_0_140px_rgba(16,185,129,0.18)]'
            : 'shadow-[inset_0_0_140px_rgba(239,68,68,0.18)]'
          : ''
      }`}
    >
      {/* Top Header & Timer Bar */}
      <Header gameState={gameState} timeLeft={timeLeft} onLeave={leaveRoom} isConnected={isConnected} />
      <TimerBar timeLeft={timeLeft} totalTime={gameState.phaseDuration} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3.5 sm:p-6 pb-8 sm:pb-8 flex flex-col justify-center">
        {currentPhase === 'LOBBY' && (
          <LobbyScreen
            gameState={gameState}
            onAddBot={addBot}
            onRemoveBot={removeBot}
            onUpdateSettings={updateSettings}
            onStartGame={startGame}
            onResetScores={resetScores}
            errorMsg={errorMsg}
          />
        )}

        {currentPhase === 'ROLE_REVEAL' && (
          <RoleRevealScreen
            gameState={gameState}
            timeLeft={timeLeft}
            onProceed={proceedToClues}
          />
        )}

        {currentPhase === 'CLUE_INPUT' && (
          <ClueInputScreen
            gameState={gameState}
            timeLeft={timeLeft}
            onSubmitClue={submitClue}
          />
        )}

        {currentPhase === 'CLUE_SHOWCASE' && (
          <ClueShowcaseScreen
            gameState={gameState}
            timeLeft={timeLeft}
            onProceedToVoting={proceedToVoting}
          />
        )}

        {currentPhase === 'VOTING' && (
          <VotingScreen
            gameState={gameState}
            timeLeft={timeLeft}
            onCastVote={castVote}
          />
        )}

        {currentPhase === 'VOTE_RESULTS' && (
          <VoteResultsScreen
            gameState={gameState}
            timeLeft={timeLeft}
            onProceed={proceedAfterResults}
          />
        )}

        {currentPhase === 'GAME_OVER' && (
          <GameOverScreen
            gameState={gameState}
            onPlayAgain={playAgain}
            onLeave={leaveRoom}
          />
        )}
      </main>

      {/* PWA Install Prompt for Mobile */}
      <PWAInstallPrompt />
    </div>
  );
}
