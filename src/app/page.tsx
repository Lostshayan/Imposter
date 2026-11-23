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
import { ImposterGuessScreen } from '../components/ImposterGuessScreen';
import { GameOverScreen } from '../components/GameOverScreen';

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
    submitImposterGuess,
    proceedAfterResults,
    playAgain,
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
      <HomeScreen
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        onSoloPlay={handleSoloPlay}
        errorMsg={errorMsg}
      />
    );
  }

  const currentPhase = gameState.phase;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-rose-500 selection:text-white">
      {/* Top Header & Timer Bar */}
      <Header gameState={gameState} timeLeft={timeLeft} onLeave={leaveRoom} isConnected={isConnected} />
      <TimerBar timeLeft={timeLeft} totalTime={gameState.phaseDuration} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {currentPhase === 'LOBBY' && (
          <LobbyScreen
            gameState={gameState}
            onAddBot={addBot}
            onRemoveBot={removeBot}
            onUpdateSettings={updateSettings}
            onStartGame={startGame}
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

        {currentPhase === 'IMPOSTER_GUESS' && (
          <ImposterGuessScreen
            gameState={gameState}
            timeLeft={timeLeft}
            onSubmitGuess={submitImposterGuess}
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
    </div>
  );
}
