class PokemonsController < ApplicationController
    require 'faker'

    def new
        pokemon = Pokemon.new
    end

    def create
        pokemon = Pokemon.new(pokemon_params)
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        if pokemon.save
            render json: pokemon
        else
            render json: { errors: @pokemon.errors.full_messages }
        end
    end

    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

    private

    def pokemon_params 
        params.require(:pokemon).permit(:trainer_id)
    end
end
