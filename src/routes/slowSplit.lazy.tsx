import { useState } from "react";
import "@/App.css";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Firework } from "@/components/FireworkEffect";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/slowSplit")({
  component: SlowSplit,
});

function SlowSplit() {
  const [name, setName] = useState<string>("");
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [showFirework, setShowFirework] = useState<boolean>(false);

  const showFireworkEffect = () => {
    setShowFirework(true);
    setTimeout(() => {
      setShowFirework(false);
    }, 3000);
  };

  const handleClick = () => {
    if (name === "") {
      toast({ description: "Vui lòng nhập tên cầu thủ." });
      return;
    }

    if (team1.includes(name) || team2.includes(name)) {
      toast({ description: "Tên đã tồn tại trong một đội." });
      return;
    }

    const result = Math.floor(Math.random() * 2) + 1;
    if (result === 1) {
      if (team1.length < 8) {
        setTeam1([...team1, name]);
        toast({ description: `Thành viên ${name} đã được chia vào đội 1` });
        showFireworkEffect();
      } else {
        toast({ description: "Đội 1 đã đủ 8 thành viên." });
      }
    } else if (result === 2) {
      if (team2.length < 8) {
        setTeam2([...team2, name]);
        toast({ description: `Thành viên ${name} đã được chia vào đội 2` });
        showFireworkEffect();
      } else {
        toast({ description: "Đội 2 đã đủ 8 thành viên." });
      }
    }
    setName("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleReset = () => {
    setTeam1([]);
    setTeam2([]);
    setName("");
  };

  return (
    <div>
      {showFirework && <Firework />}
      <div className="flex gap-10 m-10">
        <Input
          placeholder="Điền tên cầu thủ..."
          onChange={handleInputChange}
          value={name}
        />
        <Button onClick={handleClick}>Chọn đội</Button>
        <Button onClick={handleReset}>Làm mới</Button>
      </div>
      <div className="flex justify-center space-x-20">
        <Card className="w-[300px] h-[400px] p-5 hover:scale-110 hover:bg-slate-500 hover:text-cyan-50 duration-300 cursor-pointer transition ease-in-out delay-150">
          <CardTitle>Đội 1</CardTitle>
          <CardContent className="flex flex-col items-center justify-center mt-10">
            {team1.map((player) => (
              <li className="list-disc w-fit" key={player}>
                {player}
              </li>
            ))}
          </CardContent>
        </Card>
        <Card className="w-[300px] h-[400px] p-5 hover:scale-110 hover:bg-slate-500 hover:text-cyan-50 duration-300 cursor-pointer transition ease-in-out delay-150">
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
    </div>
  );
}

export default SlowSplit;
