"use client";

import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      setError("");
      setSuccess("");

      const response = await fetch("/api/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar usuário");
      }

      setSuccess("Usuário criado com sucesso!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Criar conta</h1>

        <p className="text-zinc-400 mb-8">
          Gerencie suas finanças com segurança
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Nome</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-zinc-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-zinc-500"
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">Senha</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-zinc-500"
              placeholder="******"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-400">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>
      </div>
    </main>
  );
}
