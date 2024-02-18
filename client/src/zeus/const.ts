/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	CreateUserInput:{

	},
	Query:{
		getUser:{

		},
		getRoom:{

		},
		getAllUser:{

		}
	},
	Mutation:{
		CreateUser:{
			input:"CreateUserInput"
		}
	}
}

export const ReturnTypes: Record<string,any> = {
	Room:{
		id:"ID",
		subscribedAt:"String",
		subscribedUser:"User",
		messages:"Message"
	},
	Message:{
		id:"ID",
		msg:"String",
		time:"String",
		sentBy:"String",
		roomId:"String"
	},
	User:{
		id:"ID",
		username:"String",
		email:"String",
		password:"String",
		userLink:"String",
		friends:"String",
		requests:"String",
		room:"Room"
	},
	Query:{
		getUser:"User",
		getRoom:"Room",
		getAllUser:"User"
	},
	Mutation:{
		CreateUser:"User"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}