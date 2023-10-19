import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function BetCard(props: {
  teamName: any;
  odds: any;
  units: any;
  betType: any;
  opps: any;
  user_bet: string;
  payout: string;
  is_winner: any;
  notes: any;
  created_at: any;
}) {
  const { teamName } = props;
  const { odds } = props;
  const { units } = props;
  const { betType } = props;
  const { user_bet } = props;
  const { opps } = props;
  const { notes } = props;
  const { payout } = props;
  const { is_winner } = props;
  const { created_at } = props;

  return (
    <Card className="w-[300px] shadow-xl shadow-gray-900 mx-auto bg-slate-300 rounded-xl">
      <CardHeader>
        <CardTitle>{teamName}</CardTitle>
        <CardDescription>Desc</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols 2 gap-4">
          <div className="grid grid-rows-2 ">
            <Label htmlFor="name" className="row-span-1 text-gray-500 text-xs">
              Opponents
            </Label>
            <Label className=" font-semibold text-lg" id="name">
              {opps}
            </Label>
          </div>
          <div className="grid grid-rows-2 ">
            <Label htmlFor="name" className="text-gray-500 text-xs row-span-1">
              Units
            </Label>
            <Label className="row-span-1 font-semibold text-lg" id="name">
              {units}
            </Label>
          </div>
          <div className="grid grid-rows-2 ">
            <Label htmlFor="name" className="text-gray-500 text-xs">
              Bet Type
            </Label>
            <Label className="row-span-1 font-semibold text-lg" id="name">
              {betType}
            </Label>
          </div>
          <div className="grid grid-rows-2 ">
            <Label htmlFor="name" className="text-gray-500 text-xs">
              Bet
            </Label>
            <Label className="row-span-1 font-semibold text-lg" id="name">
              {user_bet}
            </Label>
          </div>
          <div className="grid grid-rows-2 ">
            <Label htmlFor="name" className="text-gray-500 text-xs">
              Odds
            </Label>
            <Label className="row-span-1 font-semibold text-lg" id="name">
              {odds}
            </Label>
          </div>
          <div className="grid grid-rows-2 ">
            <Label htmlFor="name" className="text-gray-500 text-xs">
              Payout
            </Label>
            <Label className="row-span-1 font-semibold text-lg" id="name">
              {payout}
            </Label>
          </div>
          <div className="flex flex-wrap col-span-2">
            <Label htmlFor="name" className="text-gray-500 text-xs">
              Note
            </Label>
            <Label
              className="border-0 py-4 font-semibold text-xs w-full h-auto break-all"
              id="name"
            >
              {notes}
            </Label>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className='flex justify-between'>
				
			</CardFooter> */}
    </Card>
  );
}
