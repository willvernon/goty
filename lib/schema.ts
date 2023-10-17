export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					avatarurl: string | null
					bio: string | null
					id: string
					joinedat: string
					username: string | null
					website: string | null
				}
				Insert: {
					avatarurl?: string | null
					bio?: string | null
					id: string
					joinedat?: string
					username?: string | null
					website?: string | null
				}
				Update: {
					avatarurl?: string | null
					bio?: string | null
					id?: string
					joinedat?: string
					username?: string | null
					website?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
			todos: {
				Row: {
					bet_type: string
					created_at: string
					id: number
					is_winner: boolean
					odds: string
					opps: string
					notes: string
					team: string
					units: string
          user_bet: string
          payout: string
					user_id: string
				}
				Insert: {
					bet_type?: string
					created_at?: string
					id?: number
					is_winner?: boolean
					odds?: string
					opps?: string
					notes?: string
					team?: string
					units?: string
          user_bet?: string
          payout?: string
					user_id: string
				}
				Update: {
					bet_type?: string
					created_at?: string
					id?: number
					is_winner?: boolean
					odds?: string
					opps?: string
					notes?: string
					team?: string
					units?: string
          user_bet?: string
          payout?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'todos_user_id_fkey'
						columns: ['user_id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
