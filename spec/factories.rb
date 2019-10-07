FactoryBot.define do
  factory :task do
    title { "Do the dishes" }
    description { "Don't let them pile up in the sink!" }
    done { false }
  end
end