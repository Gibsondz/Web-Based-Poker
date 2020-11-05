export class Player
{
    private name: string;

    constructor(name: string)
    {
        this.name = name;
    }

    public getName() : string
    {
        return this.name;
    }

    public equals(player1: Player): boolean
    {
        if(this.name == player1.getName())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}