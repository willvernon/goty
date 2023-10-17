import { Database } from "@/lib/schema";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import MenubarMain from "@/components/Menubar";
import BetCard from "@/components/BetCard";
import { Button } from "@/components/ui/button";

type Todos = Database["public"]["Tables"]["todos"]["Row"];

export default function TodoList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const [todos, setTodos] = useState<Todos[]>([]);
  const [newNotesText, setNewNotesText] = useState("");
  const [newTeamText, setNewTeamText] = useState("");
  const [newIsWinner, setNewIsWinner] = useState(false);
  const [newOddsText, setNewOddsText] = useState("");
  const [newUnitsText, setNewUnitsText] = useState("");
  const [newUser_BetText, setNewUser_BetText] = useState("");
  const [newBet_TypeText, setNewBet_TypeText] = useState("");
  const [newOppsText, setNewOppsText] = useState("");
  const [newPayoutText, setNewPayoutText] = useState("");
  const [newCreated_at, setNewCreated_at] = useState("");
  const [errorText, setErrorText] = useState("");

  const user = session.user;

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: false });

      if (error) console.log("error", error);
      else setTodos(todos);
    };

    fetchTodos();
  }, [supabase]);

  const addTodo = async (
    notesText: string,
    teamText: string,
    oddsText: string,
    oppsText: string,
    unitsText: string,
    newPayoutText: string,
    user_betText: string,
    bet_typeText: string
  ) => {
    let notes = notesText.trim();
    let team = teamText.trim();
    let odds = oddsText.trim();
    let opps = oppsText.trim();
    let units = unitsText.trim();
    let user_bet = user_betText.trim();
    let payout = newPayoutText.trim();
    let bet_type = bet_typeText.trim();
    if ((notes.length, team.length)) {
      const { data: todo, error } = await supabase
        .from("todos")
        .insert({
          odds,
          bet_type,
          opps,
          units,
          notes,
          user_bet,
          team,
          payout,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        setErrorText(error.message);
      } else {
        setTodos([...todos, todo]);
        setNewNotesText("");
        setNewTeamText("");
        setNewOddsText("");
        setNewOppsText("");
        setNewUnitsText("");
        setNewPayoutText("");
        setNewUser_BetText("");
        setNewBet_TypeText("");
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from("todos").delete().eq("id", id).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="mb-12">GOTY.</h1>
        <MenubarMain />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(
            newNotesText,
            newTeamText,
            newOddsText,
            newOppsText,
            newUnitsText,
            newPayoutText,
            newUser_BetText,
            newBet_TypeText
          );
        }}
        className="flex gap-2 my-2 justify-center"
      >
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Team"
          value={newTeamText}
          onChange={(e) => {
            setErrorText("");
            setNewTeamText(e.target.value);
          }}
        />
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Opponent"
          value={newOppsText}
          onChange={(e) => {
            setErrorText("");
            setNewOppsText(e.target.value);
          }}
        />
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Bet Type"
          value={newBet_TypeText}
          onChange={(e) => {
            setErrorText("");
            setNewBet_TypeText(e.target.value);
          }}
        />
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Bet"
          value={newUser_BetText}
          onChange={(e) => {
            setErrorText("");
            setNewUser_BetText(e.target.value);
          }}
        />
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Odds"
          value={newOddsText}
          onChange={(e) => {
            setErrorText("");
            setNewOddsText(e.target.value);
          }}
        />
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Units"
          value={newUnitsText}
          onChange={(e) => {
            setErrorText("");
            setNewUnitsText(e.target.value);
          }}
        />
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Payout"
          value={newPayoutText}
          onChange={(e) => {
            setErrorText("");
            setNewPayoutText(e.target.value);
          }}
        />
        <input
          className="rounded w-full p-2 text-center"
          type="text"
          placeholder="Notes"
          value={newNotesText}
          onChange={(e) => {
            setErrorText("");
            setNewNotesText(e.target.value);
          }}
        />
        <button className="btn-black" type="submit">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const Todo = ({ todo, onDelete }: { todo: Todos; onDelete: () => void }) => {
  const supabase = useSupabaseClient<Database>();
  const [isWinner, setIsWinner] = useState(todo.is_winner);

  const toggle = async () => {
    try {
      const { data } = await supabase
        .from("todos")
        .update({ is_winner: !isWinner })
        .eq("id", todo.id)
        .throwOnError()
        .select()
        .single();

      if (data) setIsWinner(data.is_winner);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="mt-5">
      <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex flex-col">
              <div className="text-sm leading-5 font-medium truncate">
                {todo.notes}
              </div>
              <div className="text-sm leading-5 font-medium truncate">
                {todo.team}
              </div>
            </div>
          </div>
          <div>
            <input
              className="cursor-pointer"
              onChange={(e) => toggle()}
              type="checkbox"
              checked={isWinner ? true : false}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="gray"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </li>
      <div className="w-full justify-items-center">
        <BetCard
          teamName={todo.team}
          odds={todo.odds}
          units={todo.units}
          betType={todo.bet_type}
          created_at={todo.created_at}
          opps={todo.opps}
          user_bet={todo.user_bet}
          payout={todo.payout}
          notes={todo.notes}
          is_winner={todo.is_winner}
        />

        {/* // todo: add button function  */}
        <Button className="rounded-xl" variant="outline">
          Delete
        </Button>
        <Button>Update</Button>
      </div>
    </div>
  );
};

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);
