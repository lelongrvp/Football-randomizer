import { Firework } from "@/components/FireworkEffect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: FastSplit,
});

function FastSplit() {
  const { toast } = useToast();

  const [showFirework, setShowFirework] = useState<boolean>(false);
  const [teamSize, setTeamSize] = useState<number>(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamSize(Number(e.target.value));
  };

  const showFireworkEffect = () => {
    setShowFirework(true);
    setTimeout(() => {
      setShowFirework(false);
    }, 3000);
  };

  const handlePlayersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlayers(
      e.target.value
        .split("\n")
        .map((name) => name.trim())
        .filter((name) => name)
    );
  };

  const hasDuplicate = (arr: typeof players) => {
    return new Set(arr).size !== arr.length;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      setError(null);
    } else {
      if (players.length !== teamSize * 2) {
        setError(`Please enter exactly ${teamSize * 2} player names.`);
      } else if (hasDuplicate(players)) {
        setError(`Please enter unique player names.`);
      } else {
        assignTeams();
        showFireworkEffect();
        toast({ description: "Đã chia đội xong!" });
        setError(null);
      }
    }
  };

  const assignTeams = () => {
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);
    setTeam1(shuffledPlayers.slice(0, teamSize));
    setTeam2(shuffledPlayers.slice(teamSize, teamSize * 2));
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null); // Clear any existing error messages
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {showFirework && <Firework />}
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div>
            <Label className="block text-lg font-medium text-gray-700">
              Team Size:
              <Input
                type="number"
                value={teamSize}
                onChange={handleTeamSizeChange}
                required
                min={1}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </Label>
          </div>
        )}
        {step === 2 && (
          <div>
            <Label className="block text-lg font-medium text-gray-700">
              Player Names (one per line):
              <Textarea
                onChange={handlePlayersChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-indigo-500 sm:text-sm"
              />
            </Label>
          </div>
        )}
        {step < 3 && (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleBack}
              className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex-2"
            >
              Next
            </Button>
          </div>
        )}
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {step === 3 && (
        <div className="flex justify-center space-x-20">
          <Card className="min-w-[300px] w-fit h-[400px] p-5 hover:scale-110 hover:bg-slate-500 hover:text-cyan-50 duration-300 cursor-pointer transition ease-in-out delay-150">
            <CardTitle>Đội 1</CardTitle>
            <CardContent className="flex flex-col items-center justify-center mt-10">
              <ul>
                {team1.map((player) => (
                  <li className="list-disc w-fit" key={player}>
                    {player}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="min-w-[300px] w-fit h-[400px] p-5 hover:scale-110 hover:bg-slate-500 hover:text-cyan-50 duration-300 cursor-pointer transition ease-in-out delay-150">
            <CardTitle>Đội 2</CardTitle>
            <CardContent className="flex flex-col items-center justify-center mt-10">
              <ul>
                {team2.map((player) => (
                  <li className="list-disc w-fit" key={player}>
                    {player}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default FastSplit;
