class Trello

  attr_reader :board

  def initialize(id)
    Trello.configure do |config|
      config.developer_public_key = "ffdf2de0c22db3f60875b59df83bc466" # The "key" from step 1
      config.member_token = "e51f75ea59efc02af1043a53ad01035437e47f01e5ae43f41c78cab20d19ccc9" # The token from step 3.
    end

    @board = Trello::Board.find(id)
  end

  # def board(id)
    # current development
    # Trello::Board.find("x4pKOHmu")

    # # post production
    # Trello::Board.find("mxVmo9aL")
  # end

  def lists
    @lists ||= board.lists
  end

  def lists_name_count_hash
    @lists_names ||= lists.map{ |list| [list.name, list.cards.count]}.to_h
  end
end
